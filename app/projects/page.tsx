// "use client";

// import type { NextPage } from "next";
// import ProjectCard from "../../components/ProjectCard";
// import { ProjectCardProps } from "../../components/ProjectCard";
// import { useContext, useEffect, useState } from "react";
// import ReactGA from "react-ga4";
// import { ProjectListContext } from "@/components/context";
// import { fetchProjectsStar } from "@/components/helper/helpers";
// import { Hr } from "@/components/helper/CustomHtml";

// type Props = {
//   projectsList: Array<ProjectCardProps>;
// };

// type TypeFilterBy = "stars" | "year";

// const Projects: NextPage<Props> = () => {
//   const { projectList, setProjectList } = useContext(ProjectListContext);
//   const [customOrderedProjectList, setCustomOrderedProjectList] = useState<
//     ProjectCardProps[]
//   >([]);
//   const [filterBy, setFilterBy] = useState<TypeFilterBy>("stars");
//   useEffect(() => {
//     // google analytics
//     ReactGA.send({ hitType: "pageview", page: "/projects", title: "Projects" });

//     fetchProjectsStar().then((updatedProjectsListWithStars) => {
//       setProjectList([...updatedProjectsListWithStars]);
//     });
//   }, [setProjectList]);

//   useEffect(() => {
//     const descendingSortFunction = (a: ProjectCardProps, b: ProjectCardProps) =>
//       b[filterBy] - a[filterBy];
//     setCustomOrderedProjectList([...projectList.sort(descendingSortFunction)]);
//   }, [projectList, filterBy]);

//   //   const extractBadgesSet = () => {
//   //     const s = new Set();
//   //     projectList.forEach((project) => {
//   //       project.badges.forEach((badge) => {
//   //         s.add(badge.toLowerCase());
//   //       });
//   //     });
//   //     return Array.from(s);
//   //   };

//   const filterByBadge = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.toLowerCase();
//     const filteredProjects = projectList.filter((project) => {
//       return project.badges.some((badge) =>
//         badge.toLowerCase().includes(value)
//       );
//     });
//     setCustomOrderedProjectList([...filteredProjects]);
//   };

//   return (
//     <section className="py-20">
//       <div className="my-12 sm:my-10">
//         <div className="flex sm:flex-row w-full sm:w-auto flex-col items-center text-sm 2xl:text-base">
//           <div className="flex-1">
//             <span>Filter by: </span>
//             <select
//               className=" bg-masaud-dev-secondary-black py-1 px-2 ml-2 rounded border-2 border-opacity-5 outline-none text-masaud-dev-light-grey focus:border-masaud-dev-yellow"
//               value={filterBy}
//               onChange={(e) => {
//                 ReactGA.event({
//                   category: "Button.Click",
//                   action: "Filter Projects",
//                   label: e.target.value,
//                 });
//                 setFilterBy(e.target.value as TypeFilterBy);
//               }}
//             >
//               <option value={"stars"}>stars</option>
//               <option value={"year"}>year</option>
//               <option value={"priority"}>masaud favorite</option>
//             </select>
//           </div>
//           <div className="sm:ml-4 ml-0 mt-4 sm:mt-0 w-full sm:w-auto sm:flex-1 flex items-center">
//             <span>Search by: </span>
//             <input
//               className=" border border-masaud-dev-light-grey border-opacity-10 bg-masaud-dev-primary-black py-1 px-2 mx-2 rounded flex-1 focus:border-masaud-dev-yellow active:border-masaud-dev-yellow outline-none"
//               type="text"
//               data-cursor-focusable="true"
//               name="search-project"
//               placeholder="React, Python, D3, etc."
//               onChange={filterByBadge}
//             />
//           </div>
//         </div>

//         <Hr />
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5">
//           {customOrderedProjectList.map((project: ProjectCardProps, i) => (
//             <ProjectCard key={i} {...project} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;

"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import ReactGA from "react-ga4";

import ProjectCard from "../../components/ProjectCard";
import { ProjectCardProps } from "../../components/ProjectCard";
import { ProjectListContext } from "@/components/context";
import { fetchProjectsStar } from "@/components/helper/helpers";
import { Hr } from "@/components/helper/CustomHtml";

type TypeFilterBy = "stars" | "year" | "priority";


const Projects: NextPage = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [filterBy, setFilterBy] = useState<TypeFilterBy>("stars");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch projects with stars on mount
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/projects", title: "Projects" });

    fetchProjectsStar().then((projects) => {
      setProjectList([...projects]);
    });
  }, [setProjectList]);

  // Filtered & sorted projects
  const filteredAndSortedProjects = useMemo(() => {
    if (!projectList) return [];

    // Search filter by badge
    const filtered = projectList.filter((project) =>
      project.badges.some((badge) =>
        badge.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // Sorting
    if (filterBy === "priority") {
      filtered.sort((a, b) => (b.priorityValue || 0) - (a.priorityValue || 0));
    } else {
      filtered.sort((a, b) => (b[filterBy] as number) - (a[filterBy] as number));
    }

    return filtered;
  }, [projectList, filterBy, searchQuery]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter change
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
    <section className="py-20">
      <div className="my-12 sm:my-10">
        <div className="flex sm:flex-row w-full sm:w-auto flex-col items-center text-sm 2xl:text-base">
          {/* Filter */}
          <div className="flex-1">
            <span>Filter by: </span>
            <select
              className="bg-masaud-dev-secondary-black py-1 px-2 ml-2 rounded border-2 border-opacity-5 outline-none text-masaud-dev-light-grey focus:border-masaud-dev-yellow"
              value={filterBy}
              onChange={handleFilterChange}
            >
              <option value="stars">Stars</option>
              <option value="year">Year</option>
              <option value="priority">Masaud Favorite</option>
            </select>
          </div>

          {/* Search */}
          <div className="sm:ml-4 ml-0 mt-4 sm:mt-0 w-full sm:w-auto sm:flex-1 flex items-center">
            <span>Search by: </span>
            <input
              type="text"
              className="border border-masaud-dev-light-grey border-opacity-10 bg-masaud-dev-primary-black py-1 px-2 mx-2 rounded flex-1 focus:border-masaud-dev-yellow outline-none"
              placeholder="React, Python, D3, etc."
              value={searchQuery}
              onChange={handleSearchChange}
              data-cursor-focusable="true"
            />
          </div>
        </div>

        <Hr />

        {/* Projects Grid */}
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
