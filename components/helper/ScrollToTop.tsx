"use client";

// import { useEffect, useState } from "react";
// import { FaArrowUp } from "react-icons/fa6";

// const DEFAULT_BTN_CLS =
//   "fixed bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-blue-500 to-violet-600 p-4 hover:text-xl transition-all duration-300 ease-out";
// const SCROLL_THRESHOLD = 50;

// const ScrollToTop = () => {
//   const [btnCls, setBtnCls] = useState(DEFAULT_BTN_CLS);
  
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > SCROLL_THRESHOLD) {
//         setBtnCls(DEFAULT_BTN_CLS.replace(" hidden", ""));
//       } else {
//         setBtnCls(DEFAULT_BTN_CLS + " hidden");
//       }
//     };

//     const options: AddEventListenerOptions = { passive: true };

//     window.addEventListener("scroll", handleScroll, options);
//     return () => {
//       window.removeEventListener("scroll", handleScroll, options);
//     };
//   }, []);

//   const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <button data-cursor="true" className={btnCls} onClick={onClickBtn}>
//       <FaArrowUp className="text-masaud-dev-primary-black z-10"/>
//     </button>
//   );
// };

// export default ScrollToTop;

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      data-cursor="true"
      onClick={onClickBtn}
      className={`fixed bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-blue-500 to-violet-600 p-4 transition-all duration-300 ease-out hover:text-xl ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <FaArrowUp className="text-masaud-dev-primary-black z-10" />
    </button>
  );
};

export default ScrollToTop;
