import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
export const dynamic = "force-dynamic";
// fonts are functions called with the settings object param
const inter = Inter({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-display",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

//metadata
export const metadata: Metadata = {
  title: "It's A Secret Book Club",
  description: "A book club for people who read.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        var swatches = [
          { bg: '#E63946', ink: '#FFF9F9' },
          { bg: '#2196F3', ink: '#F0F8FF' },
          { bg: '#FF9800', ink: '#1A0A00' },
          { bg: '#9C27B0', ink: '#FAF0FF' },
          { bg: '#4CAF50', ink: '#F0FFF0' },
          { bg: '#FF4081', ink: '#FFF0F5' },
          { bg: '#00BCD4', ink: '#F0FEFF' },
          { bg: '#FFEB3B', ink: '#1A1800' },
          { bg: '#FF5722', ink: '#FFF5F0' },
          { bg: '#3F51B5', ink: '#F0F2FF' },
          { bg: '#F8BBD0', ink: '#1A0A0F' },
          { bg: '#B2EBF2', ink: '#0A1A1C' },
          { bg: '#1B1B1B', ink: '#F9F8F5' },
          { bg: '#FFF9C4', ink: '#1A1800' },
          { bg: '#E8F5E9', ink: '#0A1A0F' },
        ];
        var pick = swatches[Math.floor(Math.random() * swatches.length)];
        document.documentElement.style.setProperty('--color-hero-bg', pick.bg);
        document.documentElement.style.setProperty('--color-hero-ink', pick.ink);
      })();
    `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
