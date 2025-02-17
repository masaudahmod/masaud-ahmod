import Image from "next/image";
import Link from "next/link";
import React from "react";

type BlogCardProps = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, description, tags, link, image }) => {
  return (
    <div className="bg-masaud-dev-secondary-black text-white p-5 rounded-2xl shadow-lg w-full max-w-lg">
      <Image width={300} height={600} src={image} alt={title} className="w-full h-80 object-cover rounded-lg mb-3" />
      <h3 className="text-xl font-semibold mb-2 cursor-none hover:text-AAsecondary transition-all duration-300">{title}</h3>
      <p className="text-gray-300 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-600 text-sm px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      <Link
        href={link}
        target="_blank"
        data-cursor="true"
        rel="noopener noreferrer"
        className="inline-block cursor-none bg-AAsecondary/50 text-white px-4 py-2 rounded-lg hover:bg-AAsecondary/80 hover:text-AAprimary transition"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
