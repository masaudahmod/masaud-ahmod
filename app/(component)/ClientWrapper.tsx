"use client";

import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("@/components/helper/Cursor"), {
  ssr: false,
});

export default function ClientWrapper() {
  return <Cursor />;
}
