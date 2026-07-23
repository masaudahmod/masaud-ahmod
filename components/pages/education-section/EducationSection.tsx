"use client";

import { educations } from "@/utils/data/educations";
import Image from "next/image";
import { BsPersonWorkspace, BsMortarboard } from "react-icons/bs";
import GlowCard from "@/components/helper/GlowCard";
import Blur23B from "@/public/blur-23.svg";
import SectionHeading from "@/components/reusable-com/SectionHeading";

const EducationSection = () => {
  return (
    <section id="educationSection" className="bg-brand-navy py-20">
      <div className="container">
        <SectionHeading number="02" title="Education" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center lg:gap-16">
          <div className="flex justify-center items-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-brand-accent/5 border border-brand-navyMuted animate-pulse-ring" />
              <div className="absolute inset-4 rounded-full bg-brand-accent/10 border border-brand-accent/20 animate-pulse-ring [animation-delay:1.25s]" />
              <div className="absolute inset-8 rounded-full bg-brand-accent/10 border border-brand-accent/20 animate-pulse-ring [animation-delay:2.25s]" />
              <BsMortarboard
                className="text-brand-accent relative z-10 animate-pulse-ring [animation-delay:0.6s]"
                size={80}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6">
            {educations.map((education) => (
              <GlowCard
                key={education.id}
                identifier={`education-${education.id}`}
              >
                <div className="p-3 relative text-brand-slateLight">
                  <Image
                    src={Blur23B}
                    alt="decorative blur"
                    width={1080}
                    height={200}
                    className="absolute bottom-0 opacity-30"
                  />
                  <div className="flex justify-center">
                    <p className="text-xs sm:text-sm text-brand-accent font-mono">
                      {education.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-8 px-3 py-5">
                    <div className="text-brand-accent transition-all duration-300 hover:scale-125">
                      <BsPersonWorkspace size={36} />
                    </div>
                    <div>
                      <p className="text-base sm:text-xl mb-2 font-medium uppercase text-brand-slateLight">
                        {education.title}
                      </p>
                      <p className="text-sm sm:text-base text-brand-slate">
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
    </section>
  );
};

export default EducationSection;
