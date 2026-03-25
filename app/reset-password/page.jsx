// app/reset-password/page.jsx
"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase for the client side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 1. Verify the token the moment the page loads
  useEffect(() => {
    async function verifySession() {
      if (!token_hash || !type) {
        setError("Invalid link. Please request a new password reset from the app.");
        setVerifying(false);
        return;
      }

      // This establishes the secure browser session!
      const { error } = await supabase.auth.verifyOtp({ token_hash, type });
      
      if (error) {
        setError("This link has expired or is invalid. Please request a new one.");
      }
      setVerifying(false);
    }

    verifySession();
  }, [token_hash, type]);

  // 2. Update the password for the now-logged-in user
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage("Password updated! Redirecting to the app...");
      // Wait 2 seconds so they can read the success message, then open the app
      setTimeout(() => {
        router.push("/open-app?target=home");
      }, 2000);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 text-center">
      <div className="relative w-40 h-40 mx-auto">
        <Image src="/About REE.jpg" alt="Reset Password" fill className="object-contain" priority />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Create New Password</h1>
        <p className="text-slate-600 text-sm">Enter a strong password for your Ree Padel account.</p>
      </div>

      {/* Show different UI based on the current state */}
      {verifying ? (
        <div className="flex justify-center py-4">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-lime-500 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium border border-red-200">
          {error}
        </div>
      ) : message ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium border border-green-200">
          {message}
        </div>
      ) : (
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input
            type="password"
            required
            minLength={6}
            placeholder="New Password"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition text-left"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-950 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}

// Wrap the form in Suspense so Next.js can safely read the URL parameters
export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-blue-950">
      <Suspense fallback={
        <div className="w-8 h-8 border-4 border-slate-200 border-t-lime-500 rounded-full animate-spin"></div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}