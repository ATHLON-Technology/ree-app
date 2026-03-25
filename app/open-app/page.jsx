"use client";
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function RedirectLogic() {
  const searchParams = useSearchParams();
  const target = searchParams.get('target');

  useEffect(() => {
    if (!target) return;

    const deepLinkUrl = `ree://${target}`;
    const installUrl = '/install'; 

    // 1. Attempt to open the app
    window.location.href = deepLinkUrl;

    // 2. Set a timer for the fallback
    const fallbackTimer = setTimeout(() => {
      window.location.href = installUrl;
    }, 2500);

    // Cleanup the timer
    return () => clearTimeout(fallbackTimer);
  }, [target]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-md w-full px-6">
      {/* Mascot with a gentle pulsing animation to indicate thinking/loading */}
      <div className="relative w-56 h-56 mx-auto animate-pulse">
        <Image 
          src="/Searching.png" 
          alt="Searching for Ree Padel App" 
          fill 
          className="object-contain"
          priority
        />
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-blue-950">Opening Ree Padel...</h1>
        <p className="text-lg text-slate-600">
          We are searching for the app on your device.
        </p>
      </div>

      {/* Custom Tailwind CSS Spinner matching your brand colors */}
      <div className="flex flex-col items-center space-y-4 pt-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-lime-500 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-500">
          If nothing happens, you'll be redirected shortly.
        </p>
      </div>
    </div>
  );
}

export default function OpenAppPage() {
  return (
    // The main wrapper sets the background and centers everything on the screen
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
      <Suspense fallback={
        // A stylized fallback for the split-second before the search parameters load
        <div className="flex flex-col items-center space-y-4">
           <div className="w-10 h-10 border-4 border-slate-200 border-t-lime-500 rounded-full animate-spin"></div>
           <p className="text-slate-600 font-medium">Preparing to open...</p>
        </div>
      }>
        <RedirectLogic />
      </Suspense>
    </main>
  );
}