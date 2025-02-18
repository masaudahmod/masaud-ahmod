"use client";
import { use } from "react";

interface BlogDetailsProps {
  params: Promise<{ details: string }>;
}

export default function BlogDetailsPage({ params }: BlogDetailsProps) {
  const { details } = use(params); // React.use() দিয়ে params unwrap করা হলো

  return (
    <div className="flex justify-center min-h-screen text-2xl capitalize items-center">
      <h2 data-cursor={true} className="px-5 py-3">
        Blog Details Page for ID: {details}
      </h2>
    </div>
  );
}
