// @flow strict
import { educations } from "@/utils/data/educations";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import educationLottie from "@/utils/animation/education-lottie.json";
import GlowCard from "@/components/helper/GlowCard";
import Blur23B from "@/public/blur-23.svg";
import AnimationLottie from "@/components/helper/AnimationLottie";
import { AnimationLottieProps } from "@/components/helper/AnimationLottie";


const EducationSection = () => {
  const lottieAnimation: AnimationLottieProps = {
    animationPath: educationLottie,
  };
  return (
    <div id="educationSection" className="relative p-2 z-50 py-10 lg:py-24 bg-masaud-dev-purple/20">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#362f5f]"></span>
          <span
            data-cursor="true"
            className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md"
          >
            Educations
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              {/* Left Side Lottie Animation */}
              <AnimationLottie {...lottieAnimation} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {educations.map((education) => (
                <GlowCard
                  key={education.id}
                  identifier={`education-${education.id}`}
                >
                  <div className="p-3 relative text-white">
                    <Image
                      src={Blur23B}
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {education.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-8 px-3 py-5">
                      <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                        <BsPersonWorkspace size={36} />
                      </div>
                      <div>
                        <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                          {education.title}
                        </p>
                        <p className="text-sm sm:text-base">
                          {education.institution}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
