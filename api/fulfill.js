/**
 * POST /api/fulfill — Stripe webhook -> Gelato print order.
 *
 * Stripe sends `checkout.session.completed` here after every successful
 * payment. This function verifies the webhook signature, maps the purchased
 * print/size/finish to the correct Gelato product, and places the print order
 * with the buyer's shipping address. Fully hands-off fulfillment.
 *
 * Required Vercel env vars:
 *   STRIPE_WEBHOOK_SECRET — signing secret from the Stripe webhook endpoint
 *   GELATO_API_KEY        — API key from dashboard.gelato.com/keys/manage
 */
const crypto = require('crypto');

const REPO = 'https://raw.githubusercontent.com/865photography/clint-humphrey-photography/main';

/* Full-resolution print file + orientation per product. */
const PRINTS = {
  'sunset-silhouette': { file: `${REPO}/_DSC2595.JPG`, orientation: 'hor' },
  'impact':            { file: `${REPO}/_DSC1175.JPG`, orientation: 'ver' },
  'talons-out':        { file: `${REPO}/_DSC1174.JPG`, orientation: 'ver' },
  'tandem':            { file: `${REPO}/_DSC0833.jpg`, orientation: 'ver' },
  'the-catch':         { file: `${REPO}/_DSC1110.JPG`, orientation: 'ver' },
  'golden-hour':       { file: `${REPO}/_DSC1719.JPG`, orientation: 'ver' },
  'the-dive':          { file: `${REPO}/_DSC1017.jpg`, orientation: 'ver' },
  'the-tussle':        { file: `${REPO}/the-tussle-print.jpg`, orientation: 'hor' },
  'blue-hunter':       { file: `${REPO}/_DSC4013.JPG`, orientation: 'hor' },
  'the-prize':         { file: `${REPO}/_DSC3816.JPG`, orientation: 'hor' },
  'the-crossing':      { file: `${REPO}/_DSC4053.JPG`, orientation: 'hor' },
  'talons-first':      { file: `${REPO}/_DSC4171.JPG`, orientation: 'hor' },
  'liftoff':           { file: `${REPO}/_DSC4388.jpg`, orientation: 'hor' },
  'water-off':         { file: `${REPO}/_DSC2788.JPG`, orientation: 'hor' },
  'hard-bank':         { file: `${REPO}/_DSC4052.JPG`, orientation: 'hor' },
  'rising':            { file: `${REPO}/_DSC3013.JPG`, orientation: 'ver' },
};

/* Gelato productUid bases (orientation suffix appended per print). */
const POSTER = {
  '8x10':  'flat_8x10-inch-200x250-mm_200-gsm-80lb-uncoated_4-0',
  '11x14': 'flat_270x350-mm-11x14-inch_200-gsm-80lb-uncoated_4-0',
  '12x18': 'flat_300x450-mm-12x18-inch_200-gsm-80lb-uncoated_4-0',
  '16x20': 'flat_16x20-inch-400x500-mm_200-gsm-80lb-uncoated_4-0',
  '18x24': 'flat_18x24-inch-450x600-mm_200-gsm-80lb-uncoated_4-0',
  '24x36': 'flat_24x36-inch-600x900-mm_200-gsm-80lb-uncoated_4-0',
};
const FRAMED = {
  '11x14': 'framed_poster_11x14-inch-270x350-mm_black_wood_w12xt22-mm_plexiglass_11x14-inch-270x350-mm_170-gsm-65lb-uncoated_4-0',
  '16x20': 'framed_poster_16x20-inch-400x500-mm_black_wood_w12xt22-mm_plexiglass_16x20-inch-400x500-mm_170-gsm-65lb-uncoated_4-0',
  '18x24': 'framed_poster_18x24-inch-450x600-mm_black_wood_w12xt22-mm_plexiglass_18x24-inch-450x600-mm_170-gsm-65lb-uncoated_4-0',
};
const CANVAS = {
  '24x36': 'canvas_24x36-inch-600x900-mm_canvas_wood-fsc-slim_4-0',
};

function productUidFor(finish, sizeKey, orientation) {
  let base;
  if (finish.includes('Framed')) base = FRAMED[sizeKey];
  else if (finish.includes('Canvas')) base = CANVAS[sizeKey];
  else base = POSTER[sizeKey];
  if (!base) throw new Error(`No Gelato product for finish="${finish}" size="${sizeKey}"`);
  return `${base}_${orientation}`;
}

function verifyStripeSignature(rawBody, header, secret) {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(header.split(',').map(p => p.split('=')));
  const timestamp = parts.t;
  const signatures = header.split(',').filter(p => p.startsWith('v1=')).map(p => p.slice(3));
  // Reject webhooks older than 5 minutes (replay protection).
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody.toString('utf8')}`, 'utf8')
    .digest('hex');
  return signatures.some(sig => {
    const a = Buffer.from(sig, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  });
}

async function gelato(path, method, body) {
  const res = await fetch(`https://order.gelatoapis.com${path}`, {
    method,
    headers: {
      'X-API-KEY': process.env.GELATO_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'clint-humphrey-photography/1.0',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!res.ok) {
    const err = new Error(`Gelato ${method} ${path} -> ${res.status}: ${text.slice(0, 500)}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  // Read the raw body (required for signature verification).
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks);

  if (!verifyStripeSignature(rawBody, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET)) {
    console.error('fulfill: invalid Stripe signature');
    res.status(400).send('Invalid signature');
    return;
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch {
    res.status(400).send('Invalid JSON');
    return;
  }

  if (event.type !== 'checkout.session.completed') {
    res.status(200).send('Event ignored');
    return;
  }

  const session = event.data.object;
  const md = session.metadata || {};
  const printSlug = md.print;
  const sizeLabel = md.size || '';
  const finish = md.finish || '';

  try {
    const print = PRINTS[printSlug];
    if (!print) throw new Error(`Unknown print slug: ${printSlug}`);

    // sizeLabel looks like "12 × 18 in" -> "12x18"
    const normalized = sizeLabel.replace(/\s*×\s*/g, 'x').replace(/\s*in\s*/g, '').replace(/\s+/g, '');
    const productUid = productUidFor(finish, normalized, print.orientation);

    // Shipping address: current Stripe API versions put it under
    // collected_information.shipping_details; older ones use the top-level
    // shipping_details. Support both.
    const ci = session.collected_information || {};
    const ship = ci.shipping_details || session.shipping_details || {};
    const addr = ship.address || {};
    const customer = session.customer_details || {};
    const fullName = (ship.name || customer.name || '').trim();
    const spaceIdx = fullName.indexOf(' ');
    const firstName = spaceIdx > 0 ? fullName.slice(0, spaceIdx) : fullName || 'Valued';
    const lastName = spaceIdx > 0 ? fullName.slice(spaceIdx + 1) : 'Customer';

    const orderReferenceId = `stripe_${session.id}`;

    // Idempotency: don't create a duplicate if Stripe retries the webhook.
    const existing = await gelato('/v4/orders:search', 'POST', {
      orderReferenceIds: [orderReferenceId],
      limit: 1,
    });
    if (existing.orders && existing.orders.length > 0) {
      console.log(`fulfill: order already exists for ${orderReferenceId}, skipping`);
      res.status(200).send('Already fulfilled');
      return;
    }

    const order = await gelato('/v4/orders', 'POST', {
      orderType: 'order',
      orderReferenceId,
      customerReferenceId: session.customer || customer.email || 'guest',
      currency: (session.currency || 'usd').toUpperCase(),
      items: [{
        itemReferenceId: `${printSlug}-${normalized}`,
        productUid,
        files: [{ type: 'default', url: print.file }],
        quantity: 1,
      }],
      shippingAddress: {
        firstName,
        lastName,
        addressLine1: addr.line1 || '',
        addressLine2: addr.line2 || undefined,
        city: addr.city || '',
        state: addr.state || '',
        postCode: addr.postal_code || '',
        country: addr.country || 'US',
        email: customer.email || '',
        phone: customer.phone || undefined,
      },
      metadata: [
        { key: 'stripe_session', value: session.id },
        { key: 'print', value: printSlug },
        { key: 'size', value: sizeLabel },
        { key: 'finish', value: finish },
      ],
    });

    console.log(`fulfill: Gelato order ${order.id} created for Stripe session ${session.id} (${printSlug} ${sizeLabel} ${finish})`);
    res.status(200).send('Fulfilled');
  } catch (err) {
    console.error(`fulfill: FAILED for session ${session.id}:`, err.message);
    // Return 500 so Stripe retries the webhook.
    res.status(500).send('Fulfillment failed, will retry');
  }
};
