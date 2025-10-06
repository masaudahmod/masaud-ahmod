import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Cursor from "@/components/helper/Cursor";
import Header from "@/components/Header/Header";
import ScrollToTop from "@/components/helper/ScrollToTop";
import ScrollProgress from "@/components/helper/ScrollProgress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientWrapper from "./(component)/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masaud Ahmod | Full-Stack Developer",
  description:
    "This is the portfolio of Masaud Ahmod, a self-taught full-stack developer with a passion for continuous learning. I thrive on exploring new technologies and enjoy collaborating with others. As a quick learner, I am always eager to take on new challenges and expand my skill set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ToastContainer />
        <Header finishedLoading={true} />
        <ClientWrapper />
        <ScrollProgress />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
