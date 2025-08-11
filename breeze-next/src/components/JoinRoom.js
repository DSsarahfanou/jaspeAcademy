"use client";

import { useEffect, useState, useCallback } from "react";
import { 
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
  GridLayout,
  ParticipantTile,
  LayoutContextProvider,
  Chat,
  useChat
} from "@livekit/components-react";
import "@livekit/components-styles";
import axios from "/src/lib/axios";
import { FiRefreshCw, FiVideo, FiMic, FiMonitor, FiMessageSquare, FiLogOut, FiUsers, FiSend } from "react-icons/fi";
import { Tooltip } from 'react-tooltip';
import { useRoomContext as useRoom } from "@livekit/components-react";

// Nouveau thème bleu-vert professionnel
const theme = {
  primary: "#3498db",         // Bleu vif
  primaryLight: "#5dade2",    // Bleu clair
  primaryDark: "#2874a6",     // Bleu foncé
  secondary: "#2ecc71",       // Vert émeraude
  background: "#1a1a2e",      // Fond sombre bleuté
  backgroundLight: "#16213e",  // Fond légèrement plus clair
  surface: "#0f3460",         // Surface pour les éléments UI
  text: "#e6e6e6",            // Texte principal clair
  textSecondary: "#b8c2cc",   // Texte secondaire
  success: "#2ecc71",         // Vert succès
  danger: "#e74c3c",          // Rouge danger
  warning: "#f39c12",         // Orange avertissement
  info: "#3498db"             // Bleu info
};

const customStyles = {
  // Styles de base
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: theme.background,
    color: theme.text,
    padding: '2rem',
    textAlign: 'center',
    gap: '1.5rem'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: `linear-gradient(135deg, ${theme.background}, ${theme.backgroundLight})`,
    color: theme.text,
    gap: '1rem'
  },
  spinner: {
    width: '3.5rem',
    height: '3.5rem',
    border: `0.5rem solid ${theme.surface}`,
    borderTopColor: theme.primary,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  },

  // En-tête
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'rgba(26, 26, 46, 0.9)',
    zIndex: 10,
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${theme.surface}`
  },
  roomInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: theme.text
  },
  participantCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: theme.textSecondary,
    fontSize: '0.9rem',
    backgroundColor: theme.surface,
    padding: '0.35rem 0.75rem',
    borderRadius: '2rem'
  },

  // Barre de contrôle
  controlBar: {
    position: 'absolute',
    bottom: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(15, 34, 96, 0.9)',
    borderRadius: '2rem',
    padding: '0.75rem 1.5rem',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    zIndex: 10,
    border: `1px solid ${theme.primaryDark}`
  },

  // Chat
  chatContainer: {
    position: 'fixed',
    right: '1.5rem',
    bottom: '6rem',
    width: '320px',
    backgroundColor: theme.surface,
    borderRadius: '0.75rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '450px',
    zIndex: 20,
    overflow: 'hidden',
    border: `1px solid ${theme.primaryDark}`
  },
  chatHeader: {
    padding: '1rem',
    background: theme.primaryDark,
    color: theme.text,
    fontWeight: '600',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  chatMessages: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
    background: theme.backgroundLight
  },
  myMessage: {
    marginBottom: '0.75rem',
    padding: '0.75rem',
    backgroundColor: theme.primary,
    borderRadius: '0.5rem',
    color: theme.text,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    wordBreak: 'break-word'
  },
  theirMessage: {
    marginBottom: '0.75rem',
    padding: '0.75rem',
    backgroundColor: theme.surface,
    borderRadius: '0.5rem',
    color: theme.text,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    wordBreak: 'break-word',
    border: `1px solid ${theme.primaryDark}`
  },
  chatInputContainer: {
    display: 'flex',
    padding: '0.75rem',
    background: theme.backgroundLight,
    borderTop: `1px solid ${theme.primaryDark}`
  },
  chatInput: {
    flex: 1,
    padding: '0.75rem',
    border: `1px solid ${theme.primaryDark}`,
    borderRadius: '0.5rem',
    backgroundColor: theme.surface,
    color: theme.text,
    marginRight: '0.75rem',
    fontSize: '0.9rem',
    '&:focus': {
      outline: 'none',
      borderColor: theme.primary,
      boxShadow: `0 0 0 2px ${theme.primaryLight}`
    }
  },
  chatSendButton: {
    background: theme.primary,
    color: theme.text,
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0 1.25rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    '&:hover': {
      background: theme.primaryLight
    },
    '&:disabled': {
      background: theme.textSecondary,
      cursor: 'not-allowed'
    }
  },

  // Boutons et interactions
  buttonPrimary: {
    padding: '0.75rem 1.5rem',
    background: theme.primary,
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s',
    fontWeight: '500',
    fontSize: '0.95rem',
    '&:hover': {
      background: theme.primaryLight,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${theme.primaryLight}33`
    }
  }
};

function CustomVideoConference({ roomName }) {
  const tracks = useTracks(
    [{ source: "camera", withPlaceholder: true }, { source: "screen_share", withPlaceholder: false }],
    { onlySubscribed: false }
  );
  const { chatMessages, send, isSending } = useChat();
  const [message, setMessage] = useState("");
  const room = useRoom();

  const handleSendMessage = useCallback(() => {
    if (message.trim() === '' || !room || room.state !== 'connected') return;
    
    try {
      send(message);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [message, room, send]);

  return (
    <LayoutContextProvider>
      {/* En-tête personnalisé amélioré */}
      <div style={customStyles.header}>
        <div style={customStyles.roomInfo}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.35rem', 
            color: theme.text,
            fontWeight: '600'
          }}>
            {roomName}
          </h2>
        </div>
        <div style={customStyles.participantCount}>
          <FiUsers size={16} color={theme.textSecondary} />
          <span>{tracks.length} participant{tracks.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Grille de vidéo avec nouveau style */}
      <GridLayout 
        tracks={tracks} 
        style={{ 
          height: 'calc(100vh - 80px)',
          padding: '1rem',
          boxSizing: 'border-box',
          backgroundColor: theme.background,
          gap: '1rem'
        }}
      >
        <ParticipantTile />
      </GridLayout>

      {/* Barre de contrôle premium */}
      <div style={customStyles.controlBar}>
        <ControlBar 
          controls={{
            microphone: { label: 'Micro' },
            camera: { label: 'Caméra' },
            screenShare: { label: 'Partage écran' },
            chat: { label: 'Chat' },
            leave: { label: 'Quitter' }
          }}
          variation="minimal"
        />
      </div>

      {/* Chat premium */}
      <div style={customStyles.chatContainer}>
        <div style={customStyles.chatHeader}>
          <FiMessageSquare size={18} />
          Chat
        </div>
        <div style={customStyles.chatMessages}>
          {chatMessages.map((msg, i) => (
            <div 
              key={i} 
              style={msg.from?.isLocal ? customStyles.myMessage : customStyles.theirMessage}
            >
              <strong style={{ color: msg.from?.isLocal ? theme.text : theme.secondary }}>
                {msg.from?.name}:
              </strong> {msg.message}
            </div>
          ))}
        </div>
        <div style={customStyles.chatInputContainer}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={!room || room.state !== 'connected'}
            style={customStyles.chatInput}
            placeholder={room?.state === 'connected' ? "Écrire un message..." : "Connexion en cours..."}
          />
          <button
            onClick={handleSendMessage}
            disabled={!room || room.state !== 'connected' || isSending}
            style={customStyles.chatSendButton}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>

      <RoomAudioRenderer />
      <Tooltip 
        anchorSelect=".lk-control-button" 
        place="top" 
        style={{ 
          background: theme.surface,
          color: theme.text,
          padding: '0.5rem 0.75rem',
          borderRadius: '0.5rem',
          zIndex: 100,
          border: `1px solid ${theme.primaryDark}`,
          fontSize: '0.85rem',
          fontWeight: '500'
        }}
      />
    </LayoutContextProvider>
  );
}

export default function JoinRoom({ roomName }) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleDisconnected = useCallback(() => {
    setError("Vous avez été déconnecté. Veuillez rafraîchir la page.");
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      setIsConnecting(true);
      try {
        const res = await axios.post("/api/livekit/token", { room: roomName });
        setToken(res.data.token);
      } catch (err) {
        setError("Erreur de connexion au serveur");
      } finally {
        setIsConnecting(false);
      }
    };
    fetchToken();
  }, [roomName]);

  if (!token) {
    return (
      <div style={customStyles.loadingContainer}>
        {isConnecting ? (
          <>
            <div style={customStyles.spinner}></div>
            <h2 style={{ color: theme.text, margin: 0 }}>Connexion en cours</h2>
            <p style={{ color: theme.textSecondary, margin: 0 }}>Préparation de votre espace de réunion...</p>
          </>
        ) : (
          <>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              background: theme.danger,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <FiLogOut size={28} color="white" />
            </div>
            <h2 style={{ color: theme.text, margin: 0 }}>Erreur de connexion</h2>
            <p style={{ color: theme.textSecondary, maxWidth: '300px' }}>
              {error || "Impossible d'obtenir les identifiants de connexion"}
            </p>
            <button
              style={customStyles.buttonPrimary}
              onClick={() => window.location.reload()}
            >
              <FiRefreshCw size={18} />
              Réessayer
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://jaspeacademy-z6vu44vo.livekit.cloud"
      connect={true}
      video={true}
      audio={true}
      onDisconnected={handleDisconnected}
      options={{
        adaptiveStream: true,
        dynacast: true,
        publishDefaults: {
          simulcast: true
        }
      }}
      style={{ 
        height: '100vh', 
        background: theme.background,
        color: theme.text
      }}
    >
      <CustomVideoConference roomName={roomName} />
    </LiveKitRoom>
  );
}

// Styles globaux améliorés
if (typeof document !== 'undefined') {
  const styles = document.createElement('style');
  styles.innerHTML = `
    @keyframes spin { to { transform: rotate(360deg); } }
    body { 
      margin: 0; 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .lk-participant-name { 
      font-weight: 500;
      color: ${theme.text};
      background: rgba(0, 0, 0, 0.5);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
    }
    .lk-video-conference { 
      background: ${theme.background}; 
    }
    .lk-focus-layout { 
      background: ${theme.backgroundLight};
      border: 1px solid ${theme.primaryDark};
    }
    .lk-control-button { 
      transition: all 0.2s !important;
      color: ${theme.text} !important;
    }
    .lk-control-button:hover { 
      background: ${theme.primaryLight} !important;
      transform: scale(1.05);
    }
    .lk-control-button[aria-pressed="true"] {
      background: ${theme.primary} !important;
    }
    .lk-participant-tile {
      border-radius: 0.75rem;
      overflow: hidden;
      border: 1px solid ${theme.primaryDark};
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: ${theme.backgroundLight};
    }
    ::-webkit-scrollbar-thumb {
      background: ${theme.primary};
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.primaryLight};
    }
  `;
  document.head.appendChild(styles);
  
  // Ajout de la police Inter
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
}