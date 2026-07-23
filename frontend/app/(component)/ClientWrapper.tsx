"use client";

import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

const Cursor = dynamic(() => import("@/components/helper/Cursor"), {
  ssr: false,
});

const ScrollToTop = dynamic(() => import("@/components/helper/ScrollToTop"), {
  ssr: false,
});

const ScrollProgress = dynamic(
  () => import("@/components/helper/ScrollProgress"),
  { ssr: false }
);

export default function ClientWrapper() {
  return (
    <>
      <ToastContainer />
      <Cursor />
      <ScrollToTop />
      <ScrollProgress />
    </>
  );
}
