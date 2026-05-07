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
      { bg: '#E63946', ink: '#FFFFFF' },
      { bg: '#2196F3', ink: '#FFFFFF' },
      { bg: '#FF9800', ink: '#000000' },
      { bg: '#9C27B0', ink: '#FFFFFF' },
      { bg: '#4CAF50', ink: '#000000' },
      { bg: '#FF4081', ink: '#FFFFFF' },
      { bg: '#00BCD4', ink: '#000000' },
      { bg: '#FFEB3B', ink: '#000000' },
      { bg: '#FF5722', ink: '#FFFFFF' },
      { bg: '#3F51B5', ink: '#FFFFFF' },
      { bg: '#F8BBD0', ink: '#000000' },
      { bg: '#B2EBF2', ink: '#000000' },
      { bg: '#1B1B1B', ink: '#FFFFFF' },
      { bg: '#FFF9C4', ink: '#000000' },
      { bg: '#E8F5E9', ink: '#000000' },
      { bg: '#D32F2F', ink: '#FFFFFF' },
      { bg: '#1565C0', ink: '#FFFFFF' },
      { bg: '#2E7D32', ink: '#FFFFFF' },
      { bg: '#F57F17', ink: '#000000' },
      { bg: '#AD1457', ink: '#FFFFFF' },
    ];

    function pick() {
      return swatches[Math.floor(Math.random() * swatches.length)];
    }

    var sections = ['hero', 'about', 'currentbook', 'events', 'join', 'footer'];

    sections.forEach(function(section) {
      var swatch = pick();
      document.documentElement.style.setProperty('--color-' + section + '-bg', swatch.bg);
      document.documentElement.style.setProperty('--color-' + section + '-ink', swatch.ink);
    });
  })();
`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
