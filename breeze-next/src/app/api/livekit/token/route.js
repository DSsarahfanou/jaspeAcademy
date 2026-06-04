import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Récupérer le token depuis le backend Laravel
    const authHeader = req.headers.get('authorization');
    
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/livekit/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader || '',
      },
      body: await req.text(),
    });

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la génération du token' }, { status: 500 });
  }
}
