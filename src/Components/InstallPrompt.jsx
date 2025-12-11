import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  if (!showInstall) return null;

  return (
    <div className="install-prompt">
      <div className="install-prompt__content">
        <p className="install-prompt__text">
          ¿Instalar Toros y Vacas en tu dispositivo?
        </p>
        <div className="install-prompt__actions">
          <button
            className="install-prompt__btn install-prompt__btn--dismiss"
            onClick={() => setShowInstall(false)}
          >
            Ahora no
          </button>
          <button
            className="install-prompt__btn install-prompt__btn--install"
            onClick={handleInstall}
          >
            Instalar
          </button>
        </div>
      </div>
    </div>
  );
}
