import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';

export default function InstallPrompt() {
  const t = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // No mostrar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

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

  useEffect(() => {
    // Escuchar cuando se instala la app
    window.addEventListener('appinstalled', () => {
      setShowInstall(false);
      setDeferredPrompt(null);
    });
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
          {t('confirmInstall')}
        </p>
        <div className="install-prompt__actions">
          <button
            className="install-prompt__btn install-prompt__btn--dismiss"
            onClick={() => setShowInstall(false)}
          >
            {t('installLater')}
          </button>
          <button
            className="install-prompt__btn install-prompt__btn--install"
            onClick={handleInstall}
          >
            {t('installNow')}
          </button>
        </div>
      </div>
    </div>
  );
}
