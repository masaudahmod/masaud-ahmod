import ArrowIcon from "@/components/reusable-com/ArrowIcons";
import Img from "@/components/reusable-com/Img";
import SectionHeading from "@/components/reusable-com/SectionHeading";
import { personalData } from "@/utils/data/personal-data";
import { skillsData } from "@/utils/data/skills";
import React from "react";

const profileImage =
  "https://i.ibb.co.com/4ZMqPQ2/me.png";

export default function AboutMe() {
  const mid = Math.ceil(skillsData.length / 2);
  const technologies = [skillsData.slice(0, mid), skillsData.slice(mid)];

  return (
    <div
      id="aboutSection"
      className="snap-start flex flex-col items-center py-20 bg-brand-navy"
    >
      <div className="flex flex-col space-y-8 px-4 sm:px-0 w-full container mx-auto">
        <SectionHeading number="01" title="About Me" />

        <div className="w-full flex flex-col md:flex-row justify-evenly items-center space-y-8 md:space-y-0 md:space-x-8 sm:space-x-2">
          <div className="w-full md:w-7/12 space-y-4 sm:text-base text-sm">
            <div className="text-justify">
              <span className="text-brand-slate">
                Hello! I&apos;m Masaud, a passionate{" "}
                <span data-cursor={true} className="text-brand-accent">
                  MERN Stack Developer
                </span>{" "}
                with strong problem-solving skills. My journey in programming
                began at a young age, self-learning coding and diving into
                various technologies. This drive led me to pursue in my
                Development field.
              </span>
            </div>
            <div className="text-justify">
              <span className="text-brand-slate">
                From self-learning to real-world experience, my journey as a
                full-stack developer has been fueled by curiosity and a passion
                for problem-solving. I thrive on building high-performance web
                applications using technologies like Next.js, Firebase, Redux
                Toolkit, and MongoDB. Whether crafting sleek UI components,
                optimizing API performance, or experimenting with AI-driven
                solutions, I love pushing the limits of what&apos;s possible.{" "}
                <span data-cursor={true} className="text-brand-accent">
                  My focus
                </span>{" "}
                is on creating impactful, scalable solutions that make the web
                more dynamic and accessible. Always ready for the next
                challenge—
              </span>
            </div>

            <div className="tracking-wide text-justify">
              <span className="text-brand-slate">
                I&apos;m always interested to keep learning and improve my
                skills to make a positive impact in the tech world. Here are
                some of the technologies I&apos;ve been working with:
              </span>
            </div>
            <div className="tracking-wide flex flex-row space-x-8 sm:space-x-16 justify-start">
              {technologies.map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col space-y-3 sm:text-base text-sm">
                  {column.map((tech) => (
                    <div
                      key={tech}
                      className="flex flex-row items-center space-x-2"
                    >
                      <ArrowIcon className="h-3 w-3 text-brand-accent" />
                      <span className="text-brand-slate sm:text-sm text-xs font-mono">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="group relative lg:w-96 lg:h-96 md:w-72 md:h-72 md:block hidden">
            <div className="group-hover:translate-x-3 group-hover:translate-y-2 duration-300 absolute w-5/6 h-5/6 border-2 border-brand-accent translate-x-5 translate-y-5 rounded" />
            <div
              data-cursor={true}
              className="absolute w-5/6 h-5/6 rounded overflow-hidden"
            >
              <div
                data-cursor={true}
                className="absolute w-full h-full group-hover:opacity-0 bg-brand-accent opacity-10 duration-300 rounded overflow-hidden"
              />
              <Img
                src={profileImage}
                className="object-contain rounded-lg grayscale group-hover:grayscale-0 transition-all duration-300"
                alt={`${personalData.name} - MERN Stack Developer`}
              />
            </div>
          </div>

          <div className="relative w-full h-48 md:hidden flex justify-center items-center">
            <div className="absolute w-48 h-full rounded translate-x-5 translate-y-5 border-2 border-brand-accent" />
            <div className="absolute w-48 h-full rounded overflow-hidden">
              <Img
                src={profileImage}
                className="object-contain rounded-lg"
                alt={`${personalData.name} - MERN Stack Developer`}
              />
            </div>
            <div className="absolute w-48 h-full bg-brand-accent opacity-10 rounded overflow-hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
