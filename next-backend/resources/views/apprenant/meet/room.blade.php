<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réunion — {{ $meeting->formation?->name ?? $meeting->room_link }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background: #0f172a; color: #fff; }
        #video-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
        .participant-tile { position: relative; background: #1e293b; border-radius: 12px; overflow: hidden;
                            aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; }
        .participant-tile video { width: 100%; height: 100%; object-fit: cover; }
        .participant-label { position: absolute; bottom: 8px; left: 10px; font-size: 0.75rem; font-weight: 600;
                             background: rgba(0,0,0,0.55); backdrop-filter: blur(4px);
                             padding: 2px 8px; border-radius: 99px; }
        .participant-avatar { width: 64px; height: 64px; border-radius: 50%; background: #334155;
                              display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: #94a3b8; }
        .control-btn { display: flex; flex-direction: column; align-items: center; gap: 4px;
                       padding: 10px 16px; border-radius: 12px; border: none; cursor: pointer;
                       font-size: 0.7rem; font-weight: 600; transition: all 0.18s; }
        .control-btn:hover { transform: scale(1.05); }
        .btn-active { background: #334155; color: #f1f5f9; }
        .btn-active:hover { background: #475569; }
        .btn-danger { background: #ef4444; color: #fff; }
        .btn-danger:hover { background: #dc2626; }
        .btn-muted { background: #f43f5e; color: #fff; }
    </style>
</head>
<body class="h-screen flex flex-col">

    {{-- Top bar --}}
    <div class="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800 flex-shrink-0">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-graduation-cap text-white text-xs"></i>
            </div>
            <div>
                <p class="text-sm font-bold">{{ $meeting->formation?->name ?? 'Réunion' }}</p>
                <p class="text-xs text-slate-400">
                    Niveau {{ $meeting->progression_level }}% ·
                    {{ \Carbon\Carbon::parse($meeting->scheduled_at)->locale('fr')->isoFormat('D MMM [à] HH[h]mm') }}
                </p>
            </div>
        </div>
        <div class="flex items-center gap-3">
            {{-- Animateur --}}
            <div class="hidden sm:flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5">
                <i class="fas fa-chalkboard-teacher text-purple-400 text-xs"></i>
                <span class="text-xs text-slate-300">
                    {{ $meeting->teacher?->name }} {{ $meeting->teacher?->surname }}
                </span>
            </div>
            <div id="connection-status" class="flex items-center gap-1.5 text-xs text-slate-400">
                <span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span>Connexion…</span>
            </div>
        </div>
    </div>

    {{-- Video area --}}
    <div class="flex-1 overflow-auto p-4">
        <div id="video-grid"></div>
        <div id="empty-state" class="flex flex-col items-center justify-center h-full text-slate-500 gap-3 py-20">
            <i class="fas fa-video-slash text-4xl"></i>
            <p class="text-sm">En attente de connexion…</p>
        </div>
    </div>

    {{-- Controls --}}
    <div class="flex items-center justify-center gap-3 px-5 py-4 bg-slate-900 border-t border-slate-800 flex-shrink-0">
        <button id="btn-mic" onclick="toggleMic()" class="control-btn btn-active">
            <i class="fas fa-microphone text-lg"></i>
            <span>Micro</span>
        </button>
        <button id="btn-cam" onclick="toggleCam()" class="control-btn btn-active">
            <i class="fas fa-video text-lg"></i>
            <span>Caméra</span>
        </button>
        <button onclick="leaveRoom()" class="control-btn btn-danger">
            <i class="fas fa-phone-slash text-lg"></i>
            <span>Quitter</span>
        </button>
    </div>

    <script src="https://unpkg.com/livekit-client/dist/livekit-client.umd.min.js"></script>
    <script>
        const LIVEKIT_URL = @json($livekitUrl);
        const TOKEN       = @json($token);
        const RETURN_URL  = @json(route('apprenant.meet.index'));

        let room       = null;
        let micEnabled = true;
        let camEnabled = true;

        const grid       = document.getElementById('video-grid');
        const emptyState = document.getElementById('empty-state');
        const statusEl   = document.getElementById('connection-status');

        function setStatus(text, color = 'green') {
            statusEl.querySelector('span:first-child').className = `w-2 h-2 rounded-full bg-${color}-400`;
            statusEl.querySelector('span:last-child').textContent = text;
        }

        function addTile(participant, track) {
            const tileId = 'tile-' + participant.identity;
            document.getElementById(tileId)?.remove();

            const tile = document.createElement('div');
            tile.className = 'participant-tile';
            tile.id = tileId;

            if (track && (track.kind === 'video')) {
                const video = document.createElement('video');
                video.autoplay = true;
                video.playsInline = true;
                video.muted = participant.isLocal;
                track.attach(video);
                tile.appendChild(video);
            } else {
                const av = document.createElement('div');
                av.className = 'participant-avatar';
                av.textContent = participant.identity.charAt(0).toUpperCase();
                tile.appendChild(av);
            }

            const label = document.createElement('div');
            label.className = 'participant-label';
            const rawId = participant.identity;
            label.textContent = rawId.startsWith('teacher') ? 'Animateur' : rawId.replace(/student_\d+_/, '');
            tile.appendChild(label);

            grid.appendChild(tile);
            emptyState.style.display = 'none';
        }

        function removeTile(identity) {
            document.getElementById('tile-' + identity)?.remove();
            if (!grid.querySelector('.participant-tile')) {
                emptyState.style.display = '';
            }
        }

        async function connect() {
            room = new LivekitClient.Room({ adaptiveStream: true, dynacast: true });

            room.on(LivekitClient.RoomEvent.TrackSubscribed, (track, pub, participant) => {
                addTile(participant, track);
            });
            room.on(LivekitClient.RoomEvent.TrackUnsubscribed, (track, pub, participant) => {
                removeTile(participant.identity);
            });
            room.on(LivekitClient.RoomEvent.ParticipantDisconnected, participant => {
                removeTile(participant.identity);
            });
            room.on(LivekitClient.RoomEvent.Disconnected, () => {
                setStatus('Déconnecté', 'red');
            });

            try {
                await room.connect(LIVEKIT_URL, TOKEN);
                setStatus('Connecté', 'green');

                await room.localParticipant.enableCameraAndMicrophone();
                const localVideoTrack = room.localParticipant
                    .getTrackPublication(LivekitClient.Track.Source.Camera)?.track;
                if (localVideoTrack) addTile(room.localParticipant, localVideoTrack);

            } catch (err) {
                setStatus('Erreur', 'red');
                console.error(err);
            }
        }

        async function toggleMic() {
            if (!room) return;
            micEnabled = !micEnabled;
            await room.localParticipant.setMicrophoneEnabled(micEnabled);
            const btn = document.getElementById('btn-mic');
            btn.className = micEnabled ? 'control-btn btn-active' : 'control-btn btn-muted';
            btn.querySelector('i').className = micEnabled ? 'fas fa-microphone text-lg' : 'fas fa-microphone-slash text-lg';
        }

        async function toggleCam() {
            if (!room) return;
            camEnabled = !camEnabled;
            await room.localParticipant.setCameraEnabled(camEnabled);
            const btn = document.getElementById('btn-cam');
            btn.className = camEnabled ? 'control-btn btn-active' : 'control-btn btn-muted';
            btn.querySelector('i').className = camEnabled ? 'fas fa-video text-lg' : 'fas fa-video-slash text-lg';
            if (!camEnabled) removeTile(room.localParticipant.identity);
            else {
                const t = room.localParticipant.getTrackPublication(LivekitClient.Track.Source.Camera)?.track;
                if (t) addTile(room.localParticipant, t);
            }
        }

        async function leaveRoom() {
            if (room) await room.disconnect();
            window.location.href = RETURN_URL;
        }

        connect();
    </script>
</body>
</html>
