"use client";

import React, { useRef, useState, useEffect } from "react";
import Logo from "./Headercomp/Logo";
import DesktopMenu from "./Headercomp/DesktopMenu";
import IconMenu from "./Headercomp/IconMenu";
import MobileMenu from "./Headercomp/MobileMenu";
import { motion } from "framer-motion";
// import AppContext from "../AppContextFolder/AppContext";

const Header = ({ finishedLoading }: { finishedLoading: boolean }) => {
  const RefNavBar = useRef<HTMLDivElement | null>(null);
  const [ShowElement, setShowElement] = useState(false);
  const [rotate, setRotate] = useState(false);
  // const context = useContext(AppContext);
  // const scrollSizeY = useRef(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       if (window.scrollY > scrollSizeY.current) {
  //         RefNavBar.current?.classList.replace(
  //           "translate-y-0",
  //           "-translate-y-full"
  //         );
  //       } else {
  //         RefNavBar.current?.classList.replace(
  //           "-translate-y-full",
  //           "translate-y-0"
  //         );
  //       }
  //     }
  //     scrollSizeY.current = window.scrollY;
  //   };

  //   if (!context.sharedState.portfolio.NavBar.scrolling) {
  //     context.sharedState.portfolio.NavBar.scrolling = true;
  //     window.addEventListener("scroll", handleScroll);
  //   }
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [context.sharedState.portfolio.NavBar]);

  useEffect(() => {
    setTimeout(() => setShowElement(true), 10400);
  }, []);

  useEffect(() => {
    document.body.style.overflow = rotate ? "hidden" : "auto";
  }, [rotate]);

  return (
    <>
      <MobileMenu
        rotate={rotate}
        setRotate={setRotate}
        setShowElement={setShowElement}
        ShowElement={ShowElement}
      />
      <motion.div
        ref={RefNavBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { delay: finishedLoading ? 0 : 9.4, duration: 0 },
        }}
        className={`w-full fixed ${
          ShowElement ? `bg-opacity-70 shadow-xl` : `bg-opacity-0`
        } bg-AAprimary flex justify-between px-6 sm:px-12 py-2 sm:py-4 transition duration-4000 translate-y-0 z-50`}
      >
        <Logo finishedLoading={finishedLoading} />
        <IconMenu
          rotate={rotate}
          setRotate={setRotate}
          setShowElement={setShowElement}
          ShowElement={ShowElement}
          finishedLoading={finishedLoading}
        />
        <DesktopMenu finishedLoading={finishedLoading} />
      </motion.div>
    </>
  );
};

export default Header;
