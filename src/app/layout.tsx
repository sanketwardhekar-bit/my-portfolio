import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sanket Wardhekar",
    description: "Portfolio of research, projects, publications, and writing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
            <head>
                {/* Default LIGHT mode; remove 'dark' unless user stored it */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
(function(){try{
  var t = localStorage.getItem('theme');
  var c = document.documentElement.classList;
  if(t==='dark') c.add('dark'); else c.remove('dark');
}catch(e){}})();
`,
                    }}
                />
            </head>
            <body className="min-h-dvh bg-background text-foreground">
                {/* ✅ Render your header globally */}
                <Header />

                {/* If your Header is sticky, give space so content isn't hidden under it */}
                <main className="pt-14">
                    {children}
                </main>

                {/* Vercel analytics */}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
