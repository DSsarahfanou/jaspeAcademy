'use client';

import { useState } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
// import '@livekit/components-react/style.css';
import axios from '/src/lib/axios';

export default function MeetingScheduler({ formationId, progressLevel, students }) {
  const [date, setDate] = useState('');
  const [token, setToken] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleScheduleMeeting = async () => {
    try {
      // Générer un token LiveKit
      const res = await axios.post('/api/livekit/token', {
        formationId,
        progressLevel,
        date,
      });
      const { token, room } = res.data;
      setToken(token);
      setRoomName(room);

      // Enregistrer la réunion dans l'API Laravel
      await axios.post('/api/meetings', {
        formation_id: formationId,
        progress_level: progressLevel,
        date,
        room_name: room,
      });
    } catch (error) {
      console.error('Erreur lors de la programmation de la réunion', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Programmer une réunion ({progressLevel}%)</h3>
      <p className="text-sm text-gray-600 mb-4">
        Étudiants éligibles : {students.length}
      </p>
      <ul className="list-disc pl-5 mb-4">
        {students.map((student) => (
          <li key={student.id}>
            {student.name} ({student.pivot.progression}%)
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date et heure
        </label>
        <input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <button
        onClick={handleScheduleMeeting}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        disabled={!date}
      >
        Programmer la réunion
      </button>
      {token && roomName && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Rejoindre la réunion</h4>
          <LiveKitRoom
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            audio={true}
            video={true}
          >
            <VideoConference />
          </LiveKitRoom>
        </div>
      )}
    </div>
  );
}