import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import "react-toastify/dist/ReactToastify.css";
import Context from "@/components/context";
import ClientWrapper from "./(component)/ClientWrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Masaud Ahmod | MERN Stack & Full Stack Developer",

  description:
    "Masaud Ahmod is a passionate MERN Stack and Full Stack Developer skilled in JavaScript, React, Node.js, Express, and MongoDB.",

  keywords: [
    "Masaud Ahmod",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Next js Developer",
    "JavaScript Developer",
    "React Developer",
    "Node.js Developer",
    "Express Developer",
    "TypeScript Developer",
    "Next.js Developer",
  ],

  authors: [{ name: "Masaud Ahmod" }],

  robots: "index, follow",

  openGraph: {
    title: "Masaud Ahmod | MERN Stack & Full Stack Developer",
    description:
      "Portfolio of Masaud Ahmod, MERN Stack and Full Stack Developer.",
    url: "https://masaud-ahmod.vercel.app",
    siteName: "Masaud Ahmod Portfolio",
    images: [
      {
        url: "https://masaud-ahmod.vercel.app",
        width: 1200,
        height: 630,
        alt: "Masaud Ahmod MERN Stack Developer"
      }
    ],
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Masaud Ahmod | MERN Stack Developer",
    description:
      "MERN Stack and Full Stack Developer portfolio.",
    images: ["https://masaud-ahmod.vercel.app"]
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Header finishedLoading={true} />
        <Context>
          <ClientWrapper />
          {children}
        </Context>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
