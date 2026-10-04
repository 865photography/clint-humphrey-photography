// POST /api/upload-part — store one base64 chunk as a GitHub blob, return its SHA.
// No password check here; /api/upload-finish verifies before assembling.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' });
    return;
  }
  const { uploadId, index, total, chunk } = req.body || {};
  if (typeof uploadId !== 'string' || !uploadId ||
      !Number.isInteger(index) || !Number.isInteger(total) ||
      typeof chunk !== 'string' || !chunk) {
    res.status(400).json({ error: 'bad payload' });
    return;
  }
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.INCOMING_REPO || '865photography/clint-humphrey-photography';
  if (!token) {
    res.status(500).json({ error: 'server not configured' });
    return;
  }
  try {
    const gh = await fetch(
      'https://api.github.com/repos/' + repo + '/git/blobs',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'chp-studio-upload'
        },
        body: JSON.stringify({ content: chunk, encoding: 'base64' })
      }
    );
    if (!gh.ok) {
      const t = await gh.text();
      res.status(502).json({ error: 'github blob failed', detail: t.slice(0, 200) });
      return;
    }
    const data = await gh.json();
    res.status(200).json({ sha: data.sha });
  } catch (e) {
    res.status(502).json({ error: 'github blob error', detail: String(e).slice(0, 200) });
  }
};
