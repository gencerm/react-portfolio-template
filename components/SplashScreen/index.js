import { useEffect } from "react";
import { createPortal } from "react-dom";

// Splash screen: oturum başında bir kez gösterilir
// onDone: animasyon bitince _app.js'e "kapat" sinyali gönderir
const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    // 2200ms → CSS animasyonu bitince unmount et
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return createPortal(
    <div className="splash-overlay fixed inset-0 z-[999] flex items-center justify-center bg-white pointer-events-none">
      {/* Gradient accent — sayfadaki gradient-circle ile aynı renk */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(248,107,223,0.5) 0%, rgba(107,107,248,0.3) 60%, transparent 100%)",
        }}
      />

      {/* Logo */}
      <img
        src="/images/logo.svg"
        alt="Logo"
        className="splash-logo relative z-10 w-40 tablet:w-56 laptop:w-64"
      />
    </div>,
    document.body
  );
};

export default SplashScreen;
