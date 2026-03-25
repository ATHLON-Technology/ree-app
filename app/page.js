import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-blue-950 font-sans tracking-wide">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Meet. Match. <br/> <span className="text-lime-500">Play Padel.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-lg mx-auto md:mx-0">
            The ultimate community for padel lovers. Find players at your level, join matches, and track your progress all in one app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link href="/install" className="bg-blue-950 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition shadow-lg">
              Download the App
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full max-w-md relative aspect-square">
          <Image 
            src="/Playing Padel.png" 
            alt="Ree Padel Mascot ready to play" 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why join Ree Padel?</h2>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {/* Feature 1 */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="relative w-40 h-40">
                <Image src="/Searching.png" alt="Searching for matches" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold">Find Matches Easily</h3>
              <p className="text-slate-600">Use our smart filters to find open courts and players at your exact skill level.</p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="relative w-40 h-40">
                <Image src="/Friends.png" alt="Padel Friends" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold">Build Your Crew</h3>
              <p className="text-slate-600">Connect with local players, make new friends, and build your ultimate padel network.</p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="relative w-40 h-40">
                <Image src="/Like.png" alt="We love Padel" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold">Share the Love</h3>
              <p className="text-slate-600">Rate your matches, leave feedback, and grow the padel community together.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}