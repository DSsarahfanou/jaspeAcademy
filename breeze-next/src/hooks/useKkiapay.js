// hooks/useKkiapay.js
import { useEffect, useState } from 'react';

export function useKkiapay() {
  const [kkiapayReady, setKkiapayReady] = useState(false);

  useEffect(() => {
    // Vérifier si le script est déjà chargé
    if (typeof window !== 'undefined' && window.kkiapay) {
      setKkiapayReady(true);
      return;
    }

    // Le script est déjà chargé via <Script> dans le composant,
    // donc on attend simplement qu'il soit disponible
    const checkKkiapay = setInterval(() => {
      if (window.kkiapay) {
        setKkiapayReady(true);
        clearInterval(checkKkiapay);
      }
    }, 100);

    // Cleanup : arrêter l'intervalle
    return () => clearInterval(checkKkiapay);
  }, []);

  return kkiapayReady;
}