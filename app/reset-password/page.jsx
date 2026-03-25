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
    const [showPassword, setShowPassword] = useState(false);

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
                <Image src="/About REE.png" alt="Reset Password" fill className="object-contain" priority />
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
                    <div className="relative w-full">
                        <input
                            // 1. Swap the type based on the state
                            type={showPassword ? "text" : "password"}
                            required
                            minLength={6}
                            placeholder="New Password"
                            // 2. Add pr-12 so the text doesn't type underneath the icon
                            className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition text-left"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 transition-colors"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                    </div>
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