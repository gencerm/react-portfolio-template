import "../styles/globals.css";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import Head from "next/head";
import SplashScreen from "../components/SplashScreen";
import { LanguageProvider } from "../context/LanguageContext";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  // Sunucu her zaman false render eder (window yok).
  // useEffect yalnızca client'ta, hydration bittikten sonra çalışır —
  // o zaman sessionStorage'a bakıp splash'i açarız.
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("splash-seen")) {
      sessionStorage.setItem("splash-seen", "1");
      setShowSplash(true);
    }
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
        </Head>

        {showSplash && (
          <SplashScreen onDone={() => setShowSplash(false)} />
        )}

        <div key={router.asPath} className="page-enter">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
