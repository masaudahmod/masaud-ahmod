"use client";

import Lottie from "lottie-react";

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
