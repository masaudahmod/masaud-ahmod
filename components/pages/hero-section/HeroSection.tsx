import { personalData } from "@/utils/data/personal-data";
import { skillsData } from "@/utils/data/skills";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";

const socialLinks = [
  { href: personalData.github, icon: BsGithub },
  { href: personalData.linkedIn, icon: BsLinkedin },
  { href: personalData.facebook, icon: FaFacebook },
  { href: personalData.leetcode, icon: SiLeetcode },
  { href: personalData.twitterX, icon: FaSquareXTwitter },
];

function HeroSection() {
  const displaySkills = skillsData.slice(0, 8);

  return (
    <section className="min-h-screen p-2 flex items-center justify-center py-4 lg:py-12 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-brand-navyLight/20 pointer-events-none" />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8 relative z-10">
          <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
            <p className="font-mono text-brand-accent text-sm mb-4">
              Hi, my name is
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-slateLight md:font-extrabold lg:text-[3.5rem] lg:leading-[1.1]">
              <span data-cursor={true} className="text-brand-accent">
                {personalData.name}
              </span>
              .
            </h1>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-brand-slate mt-2 leading-tight">
              I build things for the web.
            </h2>
            <p className="text-brand-slate mt-6 max-w-lg text-base sm:text-lg leading-relaxed">
              A passionate{" "}
              <span className="text-brand-accent">{personalData.designation}</span>{" "}
              specializing in creating exceptional digital experiences with modern
              web technologies.
            </p>

            <div className="my-10 flex items-center gap-5">
              {socialLinks.map(({ href, icon: Icon }) => (
                <Link
                  key={href}
                  data-cursor={true}
                  href={href}
                  target="_blank"
                  className="transition-all cursor-none text-brand-slate hover:text-brand-accent hover:scale-110 duration-300"
                >
                  <Icon size={28} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <Link
                data-cursor={true}
                href="#contactSection"
                className="px-6 py-3 border border-brand-accent text-brand-accent rounded font-mono text-sm hover:bg-brand-accent/10 transition-all duration-300 flex items-center gap-2"
              >
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </Link>
              <Link
                data-cursor={true}
                href={personalData.resume}
                target="_blank"
                className="px-6 py-3 bg-brand-accent text-brand-navy rounded font-mono text-sm font-semibold hover:bg-brand-accent/80 transition-all duration-300 flex items-center gap-2"
              >
                <span>Get Resume</span>
                <MdDownload size={16} />
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 from-brand-navyLight border-brand-navyMuted relative rounded-lg border bg-gradient-to-r to-brand-navy">
            <div className="flex flex-row">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-brand-accent to-brand-navyMuted" />
              <div className="h-[1px] w-full bg-gradient-to-r from-brand-navyMuted to-transparent" />
            </div>
            <div className="px-4 lg:px-8 py-5">
              <div className="flex flex-row space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-orange-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
            </div>
            <div className="overflow-hidden border-t border-brand-navyMuted px-4 lg:px-8 py-4 lg:py-8">
              <code className="font-mono text-xs md:text-sm lg:text-base">
                <div>
                  <span className="mr-2 text-brand-accent">const</span>
                  <span className="mr-2 text-brand-slateLight">developer</span>
                  <span className="mr-2 text-brand-accent">=</span>
                  <span className="text-brand-slate">{"{"}</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-brand-slateLight">name:</span>
                  <span className="text-brand-slate">{`'`}</span>
                  <span className="text-brand-accent">{personalData.name}</span>
                  <span className="text-brand-slate">{`',`}</span>
                </div>
                <div className="ml-4 lg:ml-8 mr-2">
                  <span className="text-brand-slateLight">skills:</span>
                  <span className="text-brand-slate">{`['`}</span>
                  {displaySkills.map((skill, i) => (
                    <span key={skill}>
                      <span className="text-brand-accent">{skill}</span>
                      {i < displaySkills.length - 1 ? (
                        <span className="text-brand-slate">{`', '`}</span>
                      ) : (
                        <span className="text-brand-slate">{`'`}</span>
                      )}
                    </span>
                  ))}
                  <span className="text-brand-slate">{`],`}</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-brand-slateLight">hardWorker:</span>
                  <span className="text-brand-accent">true</span>
                  <span className="text-brand-slate">,</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-brand-slateLight">quickLearner:</span>
                  <span className="text-brand-accent">true</span>
                  <span className="text-brand-slate">,</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-brand-slateLight">problemSolver:</span>
                  <span className="text-brand-accent">true</span>
                  <span className="text-brand-slate">,</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 mr-2 text-brand-accent">hireable:</span>
                  <span className="text-brand-slateLight">function</span>
                  <span className="text-brand-slate">{"() {"}</span>
                </div>
                <div>
                  <span className="ml-8 lg:ml-16 mr-2 text-brand-slateLight">return</span>
                  <span className="text-brand-slate">{`(`}</span>
                </div>
                <div>
                  <span className="ml-12 lg:ml-24 text-brand-accent">this.</span>
                  <span className="mr-2 text-brand-slateLight">hardWorker</span>
                  <span className="text-brand-slate">&amp;&amp;</span>
                </div>
                <div>
                  <span className="ml-12 lg:ml-24 text-brand-accent">this.</span>
                  <span className="mr-2 text-brand-slateLight">problemSolver</span>
                  <span className="text-brand-slate">&amp;&amp;</span>
                </div>
                <div>
                  <span className="ml-12 lg:ml-24 text-brand-accent">this.</span>
                  <span className="mr-2 text-brand-slateLight">skills.length</span>
                  <span className="mr-2 text-brand-slate">&gt;=</span>
                  <span className="text-brand-accent">5</span>
                </div>
                <div>
                  <span className="ml-8 lg:ml-16 mr-2 text-brand-slate">{`);`}</span>
                </div>
                <div>
                  <span className="ml-4 lg:ml-8 text-brand-slate">{`};`}</span>
                </div>
                <div>
                  <span className="text-brand-slate">{`};`}</span>
                </div>
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
