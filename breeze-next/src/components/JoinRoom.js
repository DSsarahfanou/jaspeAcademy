//breeze-next\src\components\JoinRoom.js
"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference, ParticipantLoop, VideoTrack, AudioTrack } from "@livekit/components-react";
import axios from "/src/lib/axios";
import { useParticipants } from "@livekit/components-react";

function DebugParticipants() {
  const participants = useParticipants();
  console.log("Participants:", participants);
  return null;
}

export default function JoinRoom({ roomName }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const res = await axios.post("/api/livekit/token", {
        room: roomName,
      });
      console.log("TOKEN:", res.data.token);
      setToken(res.data.token);
    };

    fetchToken();
  }, [roomName]);

  if (!token) return <div>Chargement...</div>;
  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://jaspeacademy-z6vu44vo.livekit.cloud"
      connect={true}
      video={true}
      audio={true}
      style={{ height: "100vh" }}
    >
      <VideoConference />
      <DebugParticipants />
    </LiveKitRoom>
  );
}