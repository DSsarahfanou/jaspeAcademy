// Header.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <Image src="/logo-dark.png" alt="Logo" width={120} height={30} />
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 text-sm text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {darkMode ? '🌙 Sombre' : '☀️ Clair'}
        </button>
        <Image
          src="/avatar.jpg"
          alt="Utilisateur"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
