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
    <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg w-full max-w-lg">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg mb-3" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-600 text-sm px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Read More
      </a>
    </div>
  );
};

export default BlogCard;
