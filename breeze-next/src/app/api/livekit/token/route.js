import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { formationId, progressLevel, date } = await req.json();
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json({ error: 'Configuration LiveKit manquante' }, { status: 400 });
  }

  const room = `formation-${formationId}-progress-${progressLevel}-${Date.now()}`;
  const identity = `trainer-${formationId}`;

  const at = new AccessToken(apiKey, apiSecret, { identity });
  at.addGrant({ roomJoin: true, room });

  return NextResponse.json({ token: at.toJwt(), room });
}