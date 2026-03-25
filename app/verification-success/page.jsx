import Image from "next/image";
import Link from "next/link";

export default function VerificationSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-blue-950">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="relative w-48 h-48 mx-auto">
          <Image 
            src="/Like.png" 
            alt="Ree Padel Success" 
            fill 
            className="object-contain"
            priority
          />
        </div>
        
        <h1 className="text-3xl font-bold">Email Confirmed!</h1>
        <p className="text-slate-600">
          Your email has been successfully verified. You are all set to hit the courts.
        </p>

        <div className="pt-6">
          <Link href="/open-app?target=home" className="block w-full bg-lime-500 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-lime-400 transition shadow-sm">
            Open Ree Padel
          </Link>
        </div>
      </div>
    </main>
  );
}