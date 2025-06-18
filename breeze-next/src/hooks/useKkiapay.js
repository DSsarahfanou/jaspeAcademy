// hooks/useKkiapay.js
import { useEffect, useState } from 'react';

export function useKkiapay() {
  const [kkiapayReady, setKkiapayReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.kkiapay) {
      setKkiapayReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.kkiapay.me/k.js';
    script.async = true;
    script.onload = () => setKkiapayReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return kkiapayReady;
}