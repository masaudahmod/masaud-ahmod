"use client";

import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/helper/CustomHtml";
import SectionHeading from "@/components/reusable-com/SectionHeading";
import blogs from "@/utils/data/blogs.json";

export default function BlogSection() {
  return (
    <section id="blogSection" className="snap-start bg-brand-navy py-20">
      <div className="container">
        <div className="flex justify-between items-center mb-2">
          <SectionHeading number="04" title="Blogs" className="mb-0 flex-1" />
          <Button
            data-cursor="true"
            onClick={() => (window.location.href = "/blogs")}
            className="ml-4 flex-shrink-0"
          >
            View all
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5 mt-10">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              key={blog.id}
              image={blog.image}
              title={blog.title}
              tagline={blog.tagline}
              year={blog.year}
              category={blog.category}
              link={blog.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
