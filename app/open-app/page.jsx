"use client";
import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function RedirectLogic() {
  const searchParams = useSearchParams();
  const target = searchParams.get('target');
  const [clicked, setClicked] = useState(false);

  // Define your URLs
  const customSchemeUrl = `ree://${target}`;
  const installUrl = '/install'; 
  
  // ⚠️ IMPORTANT: Replace 'com.yourcompany.reepadel' with your actual Android App Package Name
  const androidIntentUrl = `intent://${target}#Intent;scheme=ree;package=com.athlon.ree;end;`;

  useEffect(() => {
    if (!target) return;

    // Detect if the user is on Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    const deepLinkToUse = isAndroid ? androidIntentUrl : customSchemeUrl;

    // 1. Attempt the auto-open (This might still get blocked by the browser)
    window.location.href = deepLinkToUse;

    // 2. We extend the timer to 3 seconds to give the OS time to prompt the user
    const fallbackTimer = setTimeout(() => {
      // Only redirect to install if they haven't manually clicked the button
      if (!clicked) {
        window.location.href = installUrl;
      }
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, [target, androidIntentUrl, customSchemeUrl, clicked, installUrl]);

  // Manual click handler to bypass browser auto-redirect blocks
  const handleManualTrigger = () => {
    setClicked(true);
    const isAndroid = /Android/i.test(navigator.userAgent);
    window.location.href = isAndroid ? androidIntentUrl : customSchemeUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-md w-full px-6">
      <div className="relative w-56 h-56 mx-auto animate-pulse">
        <Image src="/Searching.jpg" alt="Searching for App" fill className="object-contain" priority />
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-blue-950">Opening Ree Padel...</h1>
        <p className="text-lg text-slate-600">
          We are sending you to the app right now.
        </p>
      </div>

      {/* The manual override button (Crucial for bypassing browser blocks!) */}
      <button 
        onClick={handleManualTrigger}
        className="bg-lime-500 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-lime-400 transition shadow-sm w-full"
      >
        Click here if nothing happens
      </button>

      <div className="flex flex-col items-center space-y-4 pt-4">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-lime-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default function OpenAppPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
      <Suspense fallback={<div className="w-10 h-10 border-4 border-slate-200 border-t-lime-500 rounded-full animate-spin"></div>}>
        <RedirectLogic />
      </Suspense>
    </main>
  );
}