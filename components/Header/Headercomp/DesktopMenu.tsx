import React from "react";
import { motion } from "framer-motion";
import { Link as ReactScrollLink } from "react-scroll";

const navItems = [
  { number: "01", label: "About", target: "aboutSection", offset: -100 },
  { number: "02", label: "Education", target: "educationSection", offset: -100 },
  { number: "03", label: "Projects", target: "projectSection", offset: -100 },
  { number: "04", label: "Blogs", target: "blogSection", offset: -100 },
  { number: "05", label: "Contact", target: "contactSection", offset: -100 },
];

export default function DesktopMenu(props: { finishedLoading: boolean }) {
  return (
    <div className="font-mono text-xs md:flex hidden flex-row items-center space-x-8">
      {navItems.map((item, index) => (
        <motion.div
          key={item.target}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: props.finishedLoading ? 0 : 1.2,
            delay: props.finishedLoading ? 0 : 9.4 + index * 0.3,
          }}
          className="text-brand-accent"
        >
          <ReactScrollLink
            to={item.target}
            spy={true}
            smooth={true}
            offset={item.offset}
            duration={200}
          >
            &gt; {item.number}.{" "}
            <span className="text-brand-slateLight hover:text-brand-accent transition-all duration-300">
              {item.label}
            </span>
          </ReactScrollLink>
        </motion.div>
      ))}

      <div
        onClick={() => {
          window.open("mailto:masaudahmod@gmail.com");
        }}
        data-cursor={true}
        className="mb-2 sm:mb-0 whitespace-nowrap text-center py-2 px-3 text-brand-accent border border-brand-accent rounded w-full sm:w-auto font-medium text-sm hover:bg-brand-accent/10 transition-all duration-300"
      >
        Hire me!
      </div>
    </div>
  );
}
