//breeze-next\src\app\(app)\dashboard\apprenant\mes-formations\[id]\meet\page.js
"use client";

import { useState } from "react";
import JoinRoom from "/src/components/JoinRoom";


export default function FormationMeetPage() {
  const [join, setJoin] = useState(false);

  const roomName = "formation_123"; // par exemple, dynamique selon ton contexte

  return (
    <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {!join ? (
        <button
          onClick={() => setJoin(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded z-50"
        >
          Rejoindre la visio
        </button>
      ) : (
        <JoinRoom roomName={roomName} />
      )}
    </div>
  );
}
