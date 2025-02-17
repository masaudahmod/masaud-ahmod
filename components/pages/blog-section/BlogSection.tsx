import BlogCard from "@/components/BlogCard";

export default function BlogSection() {
  return (
    <>
      <section id="projectSection" className="snap-start bg-AAsecondary/5">
        <div className="container py-12">
          <div className="flex my-10 gap-4 items-center">
            <div data-cursor="true" className="px-4 py-2 text-4xl sm:text-5xl text-masaud-dev-cyan font-medium">Blogs</div>
            <span className="w-full h-[2px] bg-white"></span>
            {/* <Button
              data-cursor="true"
                onClick={() => (window.location.href = "/projects")}
            >
              View all
            </Button> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5 mb-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <BlogCard
                key={index}
                title={`Blog ${index + 1}`}
                tagline={`Description for blog ${index + 1}`}
                year={2025}
                category="Web Project"
              />
            ))}
            {/* {Array.from({ length: 3 }).map((_, index) => (
              <BlogCard
                key={index}
                title={`Blog ${index + 1}`}
                description={`Description for blog ${index + 1}`}
                tags={["Tag 1", "Tag 2", "Tag 3"]}
                link={`https://example.com/blog/${index + 1}`}
                image={blogImage}
              />
            ))} */}
          </div>
        </div>
      </section>
    </>
  );
}
