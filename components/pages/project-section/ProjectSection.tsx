"use client";

import { Button } from "@/components/helper/CustomHtml";
import SectionHeading from "@/components/reusable-com/SectionHeading";
import React, { useState } from "react";
import projectsData from "@/utils/data/projects.json";
import ProjectTabs, { ProjectData } from "./ProjectTabs";
import ProjectDetail from "./ProjectDetail";

const ProjectSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = projectsData as ProjectData[];

  return (
    <section
      id="projectSection"
      className="snap-start bg-brand-navy py-20"
    >
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <SectionHeading number="03" title="Projects" className="mb-0 flex-1" />
          <Button
            data-cursor="true"
            onClick={() => (window.location.href = "/projects")}
            className="ml-4 flex-shrink-0"
          >
            View all
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-10 min-h-[320px]">
          <ProjectTabs
            projects={projects}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
          <ProjectDetail project={projects[activeIndex]} />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
