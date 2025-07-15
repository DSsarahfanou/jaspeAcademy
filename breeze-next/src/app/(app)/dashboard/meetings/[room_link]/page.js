"use client";

import JoinRoom from "/src/components/JoinRoom";

export default function MeetingRoom({ params }) {
  const { room_link } = params;

  if (!room_link) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Lien de salle invalide ou manquant.</p>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <JoinRoom roomName={room_link} />
    </div>
  );
}
