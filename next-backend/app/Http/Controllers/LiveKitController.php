<?php
//next-backend\app\Http\Controllers\LiveKitController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Lcobucci\JWT\Configuration;

class LiveKitController extends Controller
{
    public function generateToken(Request $request)
    {
        $user = $request->user();
        $roomName = $request->input('room');
        $identity = (string) $user->id; // Forcer en string

        $apiKey = config('services.livekit.api_key');
        $apiSecret = config('services.livekit.api_secret');

        if (!$apiKey || !$apiSecret) {
            Log::error('LiveKit configuration missing');
            return response()->json(['error' => 'Configuration error'], 500);
        }

        // Log pour debug
        Log::info('LiveKit Debug', [
            'room' => $roomName,
            'identity' => $identity,
            'utc_time' => gmdate('Y-m-d H:i:s'),
        ]);

        // Forcer UTC
        $now = new \DateTimeImmutable('now', new \DateTimeZone('UTC'));

        $config = Configuration::forSymmetricSigner(
            new \Lcobucci\JWT\Signer\Hmac\Sha256(),
            \Lcobucci\JWT\Signer\Key\InMemory::plainText($apiSecret)
        );

        $token = $config->builder()
            ->issuedBy($apiKey)
            ->permittedFor('livekit')
            ->identifiedBy(bin2hex(random_bytes(16)))
            ->issuedAt($now)
            ->expiresAt($now->modify('+1 hour'))
            ->withClaim('video', [
                'room' => $roomName,
                'identity' => $identity,
                'can_publish' => true,
                'can_subscribe' => true,
                'roomJoin' => true, // Ajout pour compatibilité
            ])
            ->getToken($config->signer(), $config->signingKey());

        return response()->json([
            'token' => $token->toString(),
            'room' => $roomName,
            'iat' => $now->format('Y-m-d H:i:s'),
        ]);
    }
}