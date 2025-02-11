"use client";

import { createContext, useState } from "react";
import { ProjectCardProps } from "../ProjectCard";
import projectsData from "@/utils/data/projects.json";

export const ProjectListContext = createContext<{
  projectList: ProjectCardProps[];
  setProjectList: (projectList: ProjectCardProps[]) => void;
}>({
  projectList: [],
  setProjectList: () => {},
});

export default function Context({ children }: { children: React.ReactNode }) {
  const [projectList, setProjectList] =
    useState<ProjectCardProps[]>(projectsData);

  return (
    <ProjectListContext.Provider value={{ projectList, setProjectList }}>
      {children}
    </ProjectListContext.Provider>
  );
}
