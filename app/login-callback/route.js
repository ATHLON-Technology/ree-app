import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  // If the parameters are missing, send them to an error page or install page
  if (!token_hash || !type) {
    return NextResponse.redirect(new URL('/install', request.url));
  }

  // Initialize Supabase (make sure your env variables are set!)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Verify the OTP/Hash with Supabase
  const { error } = await supabase.auth.verifyOtp({ token_hash, type });

  if (!error) {
    // Success! Email confirmed. 
    // Redirect them to the Smart Redirect page to open the app.
    return NextResponse.redirect(new URL('/open-app?target=login-callback', request.url));
  } else {
    // Verification failed (e.g., link expired)
    return NextResponse.redirect(new URL('/auth-error', request.url));
  }
}