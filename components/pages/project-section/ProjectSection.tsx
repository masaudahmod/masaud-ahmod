"use client";

import { Button } from "@/components/helper/CustomHtml";
import ProjectCard, { ProjectCardProps } from "@/components/ProjectCard";
import React from "react";
import Projects from "@/utils/data/projects.json";

const ProjectSection = () => {

  return (
    <>
      <section id="projectSection" className="snap-start bg-masaud-dev-primary-black">
        <div className="container py-12">
          <div className="flex justify-between my-10 items-center">
            <div data-cursor="true"  className="px-4 py-2 text-4xl sm:text-5xl font-bold text-AAsecondary">Projects</div>
            <Button
              data-cursor="true"
              // onClick={() => (window.location.href = "/projects")}
            >
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5 mb-12">
            {Projects.map((project: ProjectCardProps, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectSection;
