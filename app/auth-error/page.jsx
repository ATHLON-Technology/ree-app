import Image from "next/image";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-blue-950">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-64 h-64 mx-auto">
          <Image 
            src="/Sad.png" 
            alt="Sad Ree Padel Mascot" 
            fill 
            className="object-contain"
          />
        </div>
        
        <h1 className="text-3xl font-bold">Oops! Link Expired</h1>
        <p className="text-lg text-slate-600">
          We couldn't verify your link. It might have expired, or it has already been used. Don't worry, you can easily request a new one!
        </p>

        <div className="pt-6">
          <Link href="/" className="inline-block bg-lime-500 text-blue-950 px-8 py-3 rounded-full font-semibold hover:bg-lime-400 transition shadow-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}