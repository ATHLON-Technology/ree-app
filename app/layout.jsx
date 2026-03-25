// app/layout.jsx
import './globals.css'; // Make sure your Tailwind CSS is imported!

export const metadata = {
  title: 'Ree Padel | Meet, Match, Play',
  description: 'The ultimate community for padel lovers. Find players at your level, join matches, and track your progress.',
  // Open Graph is what generates the preview cards on WhatsApp, Twitter, Facebook, etc.
  openGraph: {
    title: 'Ree Padel | Meet, Match, Play',
    description: 'Find players, join matches, and track your progress.',
    url: 'https://www.reepadel.com',
    siteName: 'Ree Padel',
    images: [
      {
        // We can use your hero image for the social share card!
        url: '/Playing Padel.png', 
        width: 1200,
        height: 630,
        alt: 'Ree Padel Mascot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ree Padel | Meet, Match, Play',
    description: 'The ultimate community for padel lovers.',
    images: ['/Playing Padel.png'], 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}