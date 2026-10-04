// POST /api/upload-finish — verify password, reassemble chunk blobs into one
// file blob, and commit it to main at incoming/<timestamp>_<filename>.
const crypto = require('crypto');

const REPO = process.env.INCOMING_REPO || '865photography/clint-humphrey-photography';
const BRANCH = 'main';

function gh(path, token, opts = {}) {
  return fetch('https://api.github.com/repos/' + REPO + path, Object.assign({
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'chp-studio-upload'
    }
  }, opts));
}

function sanitize(name) {
  const base = String(name || '').split(/[\\/]/).pop();
  const clean = base.replace(/[^A-Za-z0-9._-]/g, '_').replace(/_+/g, '_');
  return clean.slice(0, 120) || 'upload.bin';
}

function bad(res, code, msg) {
  res.status(code).json({ error: msg });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { bad(res, 405, 'POST only'); return; }

  const { password, filename, contentType, blobShas } = req.body || {};
  const expected = process.env.UPLOAD_PASSWORD;
  if (!expected || typeof password !== 'string' || !password) { bad(res, 401, 'unauthorized'); return; }
  try {
    const a = Buffer.from(password, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) { bad(res, 401, 'unauthorized'); return; }
  } catch (e) { bad(res, 401, 'unauthorized'); return; }

  if (!Array.isArray(blobShas) || blobShas.length === 0) { bad(res, 400, 'no parts'); return; }
  if (blobShas.length > 2000) { bad(res, 400, 'too many parts'); return; }

  const token = process.env.GITHUB_TOKEN;
  if (!token) { bad(res, 500, 'server not configured'); return; }

  const safe = sanitize(filename);
  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14); // YYYYMMDDHHMMSS
  const destPath = 'incoming/' + stamp + '_' + safe;

  try {
    // 1. Fetch every part blob and concatenate.
    const parts = [];
    for (const sha of blobShas) {
      if (typeof sha !== 'string' || !/^[0-9a-f]{40}$/.test(sha)) { bad(res, 400, 'bad part sha'); return; }
      const r = await gh('/git/blobs/' + sha, token);
      if (!r.ok) { bad(res, 502, 'blob fetch failed'); return; }
      const j = await r.json();
      // GitHub may return content with newlines; strip them before concat.
      parts.push(String(j.content || '').replace(/\n/g, ''));
    }
    const fullB64 = parts.join('');

    // 2. Create the assembled blob.
    const bc = await gh('/git/blobs', token, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'chp-studio-upload'
      },
      body: JSON.stringify({ content: fullB64, encoding: 'base64' })
    });
    if (!bc.ok) { bad(res, 502, 'assemble blob failed'); return; }
    const fileBlob = await bc.json();

    // 3. Build tree on top of main's current tree.
    const refR = await gh('/git/ref/heads/' + BRANCH, token);
    if (!refR.ok) { bad(res, 502, 'ref lookup failed'); return; }
    const ref = await refR.json();
    const baseSha = ref.object.sha;
    const commitR = await gh('/git/commits/' + baseSha, token);
    if (!commitR.ok) { bad(res, 502, 'commit lookup failed'); return; }
    const baseTree = (await commitR.json()).tree.sha;

    const treeR = await gh('/git/trees', token, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'chp-studio-upload'
      },
      body: JSON.stringify({
        base_tree: baseTree,
        tree: [{ path: destPath, mode: '100644', type: 'blob', sha: fileBlob.sha }]
      })
    });
    if (!treeR.ok) { bad(res, 502, 'tree create failed'); return; }
    const tree = await treeR.json();

    // 4. Commit and move the branch.
    const commitCr = await gh('/git/commits', token, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'chp-studio-upload'
      },
      body: JSON.stringify({
        message: 'studio upload: ' + destPath,
        tree: tree.sha,
        parents: [baseSha]
      })
    });
    if (!commitCr.ok) { bad(res, 502, 'commit create failed'); return; }
    const newCommit = await commitCr.json();

    const updR = await gh('/git/refs/heads/' + BRANCH, token, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'chp-studio-upload'
      },
      body: JSON.stringify({ sha: newCommit.sha })
    });
    if (!updR.ok) { bad(res, 502, 'ref update failed'); return; }

    res.status(200).json({ ok: true, path: destPath });
  } catch (e) {
    bad(res, 502, 'upload failed');
  }
};
