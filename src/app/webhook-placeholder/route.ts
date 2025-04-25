// Next.js Route Handler – /webhook-placeholder  (app router)
// Verifies WooCommerce X-WC-Webhook-Signature (HMAC-SHA256, base64)

import { NextResponse } from 'next/server';
import crypto from 'crypto';

const secret = process.env.WC_WEBHOOK_SECRET ?? '';

/**
 * Validate WooCommerce HMAC signature.
 */
function isValidSignature(rawBody: Buffer, signatureHeader?: string): boolean {
  if (!signatureHeader || !secret) return false;
  const ourMac = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('base64');
  // Woo’s header is base64 too
  return crypto.timingSafeEqual(Buffer.from(ourMac), Buffer.from(signatureHeader));
}

export async function POST(req: Request) {
  // 1. Grab raw body (we can’t use req.json() – we need bytes first)
  const raw = Buffer.from(await req.arrayBuffer());
  const sig = req.headers.get('x-wc-webhook-signature') ?? '';

  // 2. Verify
  if (!isValidSignature(raw, sig)) {
    console.warn('[Woo-webhook] invalid signature');
    return new NextResponse(
      JSON.stringify({ ok: false, error: 'Invalid signature' }),
      { status: 401 }
    );
  }

  // 3. Parse JSON safely
  let payload: any = {};
  try {
    payload = JSON.parse(raw.toString('utf8'));
  } catch (e) {
    console.error('[Woo-webhook] bad JSON', e);
    return NextResponse.json({ ok: false, error: 'Bad JSON' }, { status: 400 });
  }

  // 4. TODO: forward to your future API Gateway / SQS queue here
  console.log('[Woo-webhook] order received', {
    id: payload?.id,
    status: payload?.status,
  });

  return NextResponse.json({ ok: true });
}

// Optional GET health-check
export async function GET() {
  return NextResponse.json({ ok: true });
}
