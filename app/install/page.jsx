import Image from "next/image";
import Link from "next/link";

export default function InstallPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-blue-950">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-64 h-64 mx-auto">
          <Image 
            src="/Phone.png" 
            alt="Ree Padel Mascot holding a phone" 
            fill 
            className="object-contain"
            priority
          />
        </div>
        
        <h1 className="text-3xl font-bold">Get the Ree Padel App!</h1>
        <p className="text-lg text-slate-600">
          It looks like you don't have the app installed yet. Download it now to hit the court.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          {/* Replace '#' with your actual App Store link */}
          {/* <Link href="#" className="bg-blue-950 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition">
            App Store
          </Link> */}
          {/* Replace '#' with your actual Play Store link */}
          <Link href="#" className="bg-lime-500 text-blue-950 px-8 py-3 rounded-full font-semibold hover:bg-lime-400 transition">
            Google Play
          </Link>
        </div>
      </div>
    </main>
  );
}