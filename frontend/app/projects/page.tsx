"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import ReactGA from "react-ga4";

import ProjectCard from "../../components/ProjectCard";
import { ProjectCardProps } from "../../components/ProjectCard";
import { ProjectListContext } from "@/components/context";
import { fetchProjectsStar } from "@/components/helper/helpers";
import { Hr } from "@/components/helper/CustomHtml";
import SectionHeading from "@/components/reusable-com/SectionHeading";

type TypeFilterBy = "stars" | "year" | "priority";

const Projects: NextPage = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [filterBy, setFilterBy] = useState<TypeFilterBy>("stars");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/projects", title: "Projects" });

    fetchProjectsStar().then((projects) => {
      setProjectList([...projects]);
    });
  }, [setProjectList]);

  const filteredAndSortedProjects = useMemo(() => {
    if (!projectList) return [];

    const filtered = projectList.filter((project) =>
      project.badges.some((badge) =>
        badge.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (filterBy === "priority") {
      filtered.sort((a, b) => (b.priorityValue || 0) - (a.priorityValue || 0));
    } else {
      filtered.sort((a, b) => (b[filterBy] as number) - (a[filterBy] as number));
    }

    return filtered;
  }, [projectList, filterBy, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TypeFilterBy;
    ReactGA.event({
      category: "Button.Click",
      action: "Filter Projects",
      label: value,
    });
    setFilterBy(value);
  };

  return (
    <section className="py-20 bg-brand-navy min-h-screen">
      <div className="container">
        <SectionHeading number="03" title="All Projects" />

        <div className="flex sm:flex-row w-full sm:w-auto flex-col items-center text-sm 2xl:text-base text-brand-slate mt-8">
          <div className="flex-1">
            <span>Filter by: </span>
            <select
              className="bg-brand-navyLight py-1 px-2 ml-2 rounded border border-brand-navyMuted outline-none text-brand-slateLight focus:border-brand-accent"
              value={filterBy}
              onChange={handleFilterChange}
            >
              <option value="stars">Stars</option>
              <option value="year">Year</option>
              <option value="priority">Masaud Favorite</option>
            </select>
          </div>

          <div className="sm:ml-4 ml-0 mt-4 sm:mt-0 w-full sm:w-auto sm:flex-1 flex items-center">
            <span>Search by: </span>
            <input
              type="text"
              className="border border-brand-navyMuted bg-brand-navy py-1 px-2 mx-2 rounded flex-1 text-brand-slateLight focus:border-brand-accent outline-none placeholder-brand-slate/50"
              placeholder="React, Python, D3, etc."
              value={searchQuery}
              onChange={handleSearchChange}
              data-cursor-focusable="true"
            />
          </div>
        </div>

        <Hr />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5 mt-6">
          {filteredAndSortedProjects.map((project: ProjectCardProps, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
