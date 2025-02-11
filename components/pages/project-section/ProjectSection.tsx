import { ProjectListContext } from "@/components/context";
import { Button } from "@/components/helper/CustomHtml";
import { fetchProjectsStar } from "@/components/helper/helpers";
import ProjectCard, { ProjectCardProps } from "@/components/ProjectCard";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ReactGA from "react-ga4";

const ProjectSection = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);

  const [top6Projects, setTop6Projects] = useState<ProjectCardProps[]>([]);
  const clientRouter = useRouter();

  useEffect(() => {
    setTop6Projects(
      projectList.sort((a, b) => b.priority - a.priority).slice(0, 6)
    );
  }, [projectList]);

  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
    fetchProjectsStar().then((updatedProjectsListWithStars) => {
      setProjectList([...updatedProjectsListWithStars]);
    });
  }, [setProjectList]);

  return (
    <>
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-10 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Projects</div>
          <Button
            onClick={() => {
              clientRouter.push("/projects");
            }}
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5">
          {top6Projects.map((project: ProjectCardProps, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectSection;
