/**
 * GET  /api/debug
 * Shows the environment variables that the *running* Lambda can read
 * (so you can verify Amplify ⇄ Lambda linkage).
 */
export async function GET() {
    return Response.json({
      WOO_BASE_URL        : process.env.WOO_BASE_URL        ?? null,
      WOO_CONSUMER_KEY    : !!process.env.WOO_CONSUMER_KEY,     // boolean
      WOO_CONSUMER_SECRET : !!process.env.WOO_CONSUMER_SECRET,  // boolean
      NODE_ENV            : process.env.NODE_ENV ?? null,
    });
  }
  