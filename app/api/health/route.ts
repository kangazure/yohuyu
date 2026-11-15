import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

/** Health check untuk monitoring (Dokploy / uptime checker) */
export function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'rikoardianto-v2',
      timestamp: new Date().toISOString(),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
