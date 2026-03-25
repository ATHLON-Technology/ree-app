// app/reset-callback/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  // If parameters are missing, send them to the install page
  if (!token_hash || !type) {
    return NextResponse.redirect(new URL('/install', request.url));
  }

  // Pass the tokens safely to the client-side reset page
  const redirectUrl = new URL('/reset-password', request.url);
  redirectUrl.searchParams.set('token_hash', token_hash);
  redirectUrl.searchParams.set('type', type);

  return NextResponse.redirect(redirectUrl);
}