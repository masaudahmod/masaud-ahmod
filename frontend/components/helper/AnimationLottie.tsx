"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export type AnimationLottieProps = {
  animationPath: object;
};

const AnimationLottie = ({ animationPath }: AnimationLottieProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
  };

  return <Lottie {...defaultOptions} />;
};

export default AnimationLottie;
