/*  src/app/webhook-placeholder/route.ts
    --------------------------------------------------------------------
    Minimal “no–auth” webhook endpoint.
    – Accepts POSTs from WooCommerce (or any caller)
    – Always replies 200 so WC marks the delivery “OK”
    – Logs the raw body for now (you’ll swap this out with the
      real signature-check & SQS push later).
    -------------------------------------------------------------------- */

    import { NextRequest, NextResponse } from 'next/server';

    export const config = {
      // Ensure the route can handle a raw buffer (WooCommerce sends JSON)
      api: { bodyParser: false },
    };
    
    // Accept POST (WooCommerce fires POST webhooks)
    export async function POST(req: NextRequest) {
      // 🔒 TODO: validate the X-WC-Webhook-Signature header
      const body = await req.text();           // raw payload
      console.log('[webhook-placeholder] received:', body);
    
      // Right now we just acknowledge success
      return NextResponse.json({ ok: true });
    }
    
    // (Optional) GET handler so you can visit the URL in a browser
    export async function GET() {
      return NextResponse.json({
        ok: true,
        message:
          'Webhook placeholder is alive – send a POST from WooCommerce.',
      });
    }
    