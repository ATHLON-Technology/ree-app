import { redirect } from 'next/navigation';

export default async function HighlightPage({ params }) {
  // We await params in Next.js 15+ 
  const { id } = await params;
  
  // Immediately redirect to our smart client-side handler
  redirect(`/open-app?target=hightlight/${id}`);
}