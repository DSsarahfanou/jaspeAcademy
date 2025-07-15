"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
  useParticipants,
} from "@livekit/components-react";
import axios from "/src/lib/axios";

function DebugParticipants() {
  const participants = useParticipants();
  if (process.env.NODE_ENV === "development") {
    console.log("Participants:", participants);
  }
  return null;
}

export default function JoinRoom({ roomName }) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.post("/api/livekit/token", {
          room: roomName,
        });
        console.log("TOKEN:", res.data.token);
        setToken(res.data.token);
      } catch (err) {
        console.error(err);
        setError("Impossible d'obtenir le token pour rejoindre la salle.");
      }
    };

    fetchToken();
  }, [roomName]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Connexion en cours...
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
      className="h-screen"
    >
      <VideoConference />
      <DebugParticipants />
    </LiveKitRoom>
  );
}
