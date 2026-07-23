"use client";

import React from "react";

export type ProjectData = {
  title: string;
  tabLabel: string;
  role: string;
  duration: string;
  tagline: string;
  year: number;
  badges: string[];
  highlights: string[];
  contributions: string[];
  github_url: string;
  demo_url: string;
  stars: number;
  priority: number;
  category: string;
  priorityValue?: number;
};

interface ProjectTabsProps {
  projects: ProjectData[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ProjectTabs({
  projects,
  activeIndex,
  onSelect,
}: ProjectTabsProps) {
  const handleKeyDown = (
    e: React.KeyboardEvent,
    index: number
  ) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      onSelect((index + 1) % projects.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      onSelect((index - 1 + projects.length) % projects.length);
    }
  };

  return (
    <>
      {/* Desktop vertical tabs */}
      <div
        role="tablist"
        aria-label="Projects"
        className="hidden md:flex flex-col w-48 lg:w-56 flex-shrink-0 border-l border-brand-navyMuted"
      >
        {projects.map((project, index) => (
          <button
            key={project.tabLabel}
            role="tab"
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            data-cursor="true"
            onClick={() => onSelect(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`text-left px-4 py-3 font-mono text-sm transition-all duration-300 border-l-2 ${
              activeIndex === index
                ? "border-brand-accent bg-brand-navyLight text-brand-accent"
                : "border-transparent text-brand-slate hover:bg-brand-navyLight/50 hover:text-brand-slateLight"
            }`}
          >
            {project.tabLabel}
          </button>
        ))}
      </div>

      {/* Mobile horizontal tabs */}
      <div
        role="tablist"
        aria-label="Projects"
        className="md:hidden flex overflow-x-auto custom-scroll-bar-x gap-1 pb-2 mb-4 border-b border-brand-navyMuted"
      >
        {projects.map((project, index) => (
          <button
            key={project.tabLabel}
            role="tab"
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            data-cursor="true"
            onClick={() => onSelect(index)}
            className={`flex-shrink-0 px-4 py-2 font-mono text-sm rounded transition-all duration-300 ${
              activeIndex === index
                ? "bg-brand-navyLight text-brand-accent border border-brand-accent"
                : "text-brand-slate hover:text-brand-slateLight"
            }`}
          >
            {project.tabLabel}
          </button>
        ))}
      </div>
    </>
  );
}
