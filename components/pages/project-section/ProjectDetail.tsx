"use client";

import { motion, AnimatePresence } from "framer-motion";
import ReactGA from "react-ga4";
import { Button } from "@/components/helper/CustomHtml";
import { badgeImage } from "@/components/helper/helpers";
import Img from "@/components/reusable-com/Img";
import { ProjectData } from "./ProjectTabs";

interface ProjectDetailProps {
  project: ProjectData;
}

function highlightText(text: string, highlights: string[]) {
  if (!highlights.length) return text;

  const pattern = new RegExp(
    `(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="text-brand-accent">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const demoHost = project.demo_url
    ? project.demo_url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.tabLabel}
        role="tabpanel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="flex-1 min-w-0"
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-brand-slateLight mb-2">
          {project.role}{" "}
          <span className="text-brand-accent">@ {project.title}</span>
        </h3>

        <p className="font-mono text-sm text-brand-slate mb-4">
          {project.duration}
        </p>

        {demoHost && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noreferrer"
            data-cursor="true"
            className="font-mono text-sm text-brand-accent hover:underline mb-6 inline-block"
          >
            {demoHost}
          </a>
        )}

        <ul className="space-y-3 mb-8">
          {project.contributions.map((contribution, i) => (
            <li
              key={i}
              className="flex items-start text-brand-slate text-sm sm:text-base leading-relaxed"
            >
              <span className="text-brand-accent mr-3 mt-0.5 flex-shrink-0">
                &gt;
              </span>
              <span>{highlightText(contribution, project.highlights)}</span>
            </li>
          ))}
        </ul>

        <div className="flex custom-scroll-bar-x flex-wrap gap-1 mb-4">
          {project.badges.map((badge, i) => (
            <Img
              key={i}
              className="m-1 opacity-80"
              src={`${badgeImage[badge.toLowerCase()]}`}
              alt={badge}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {project.github_url && (
            <Button
              onClick={() => {
                ReactGA.event({
                  category: "Button.Click",
                  action: "Project Github URL",
                  label: project.github_url,
                });
                window.open(project.github_url, "_blank");
              }}
            >
              View Project
            </Button>
          )}
          {project.demo_url && (
            <Button
              onClick={() => {
                ReactGA.event({
                  category: "Button.Click",
                  action: "Project Demo URL",
                  label: project.demo_url,
                });
                window.open(project.demo_url, "_blank");
              }}
            >
              Demo
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
