import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { personalData } from "@/utils/data/personal-data";

interface MobileMenuProps {
  rotate: boolean;
  setRotate: (rotate: boolean) => void;
  setShowElement: (showElement: boolean) => void;
  ShowElement: boolean;
}

const navItems = [
  { number: "01", label: "About", target: "aboutSection", offset: -50 },
  { number: "02", label: "Education", target: "educationSection", offset: -100 },
  { number: "03", label: "Projects", target: "projectSection", offset: -100 },
  { number: "04", label: "Blogs", target: "blogSection", offset: -100 },
  { number: "05", label: "Contact", target: "contactSection", offset: -100 },
];

const MobileMenu = (props: MobileMenuProps) => {
  const closeMenu = () => {
    props.setRotate(!props.rotate);
    props.setShowElement(!props.ShowElement);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={props.rotate ? { x: "0" } : { x: "100%" }}
      transition={{ x: { duration: 0.4 } }}
      className="w-full fixed h-screen flex md:hidden duration-300 z-50"
    >
      <div
        onClick={() => closeMenu()}
        className="w-1/4 h-full backdrop-blur-sm bg-brand-navy/30 hover:cursor-pointer"
      />
      <div className="w-3/4 h-full bg-brand-navyLight flex flex-col justify-center items-center space-y-8 font-sans border-l border-brand-navyMuted">
        {navItems.map((item) => (
          <Link
            key={item.target}
            to={item.target}
            spy={true}
            smooth={true}
            offset={item.offset}
            duration={200}
            onClick={() => closeMenu()}
            className="flex flex-col text-center space-y-2"
          >
            <span className="text-brand-accent text-xs font-mono">
              {item.number}.
            </span>
            <span className="text-brand-slateLight text-sm sm:text-base hover:text-brand-accent hover:cursor-pointer duration-300">
              {item.label}
            </span>
          </Link>
        ))}
        <a href={personalData.resume} target="_blank" rel="noreferrer">
          <button className="rounded border font-mono border-brand-accent hover:bg-brand-accent/10 py-2 sm:py-3 px-5 sm:px-8 text-xs text-brand-accent transition-all duration-300">
            Resume
          </button>
        </a>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
