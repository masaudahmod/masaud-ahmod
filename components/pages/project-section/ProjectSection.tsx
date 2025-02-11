"use client";

import { ProjectListContext } from "@/components/context";
import { Button } from "@/components/helper/CustomHtml";
// import { fetchProjectsStar } from "@/components/helper/helpers";
import ProjectCard, { ProjectCardProps } from "@/components/ProjectCard";
import React, { useContext, useEffect } from "react";
import ReactGA from "react-ga4";

const ProjectSection = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);

  // const [top6Projects, setTop6Projects] = useState<ProjectCardProps[]>([]);
  const dummyProject: ProjectCardProps = {
    title: "Chat App In AI Integration",
    tagline:
      "Chat App with Ai Integration Where you can chat in Making a Project with your friends and family. It also has a video call feature.",
    year: 2023,
    badges: [
      "D3",
      "Javascript",
      "Material UI",
      "React",
    ],
    github_url: "https://github.com/masaudahmod/",
    demo_url: "masaudahmod.vercel.app",
    stars: 0,
    priority: 5,
    category: "Web Project",
  };
  // useEffect(() => {
  //   setTop6Projects(
  //     projectList.sort((a, b) => b.priority - a.priority).slice(0, 6)
  //   );
  // }, [projectList]);

  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
    // fetchProjectsStar().then((updatedProjectsListWithStars) => {
    //   setProjectList([...updatedProjectsListWithStars]);
    // });
  }, [setProjectList]);
  console.log(projectList);

  return (
    <>
      <section id="projectSection" className="snap-start bg-masaud-dev-primary-black">
        <div className="container py-12">
          <div className="flex justify-between my-10 items-center">
            <div className="text-4xl sm:text-5xl font-medium">Projects</div>
            <Button
              data-cursor="true"
              onClick={() => (window.location.href = "/projects")}
            >
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5 mb-12">
            {/* {Array.from(length).map((project: ProjectCardProps, i) => (
              <ProjectCard key={i} {...project} />
            ))} */}

            {Array.from({ length: 6 }).map((ProjectCardProps, i) => (
              <ProjectCard key={i} {...dummyProject} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectSection;
