import { redirect } from 'next/navigation';

export default async function MatchPage({ params }) {
  // We await params in Next.js 15+ 
  const { id } = await params;
  
  // Immediately redirect to our smart client-side handler
  redirect(`/open-app?target=match/${id}`);
}