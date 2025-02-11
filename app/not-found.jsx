// @flow strict

import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100">
        404
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">Page Not Found</p>
      <p className="text-gray-500 dark:text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        data-cursor="true"
        href={"/"}
        className="text-secondary border border-spacing-2 py-2 px-3 rounded-sm border-AAsecondary hover:bg-ResumeButtonHover"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default page;
