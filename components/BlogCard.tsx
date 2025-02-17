import Image from "next/image";
import React from "react";
import { Button } from "./helper/CustomHtml";
import ReactGA from "react-ga4";

export type BlogCardProps = {
  title: string;
  tagline: string;
  year: number;
  category: string;
  image: string;
};
const BlogCard = (props: BlogCardProps) => {
  return (
    <div className=" flex flex-col justify-between py-6 px-6 border rounded-xl border-opacity-10 bg-masaud-dev-secondary-black transition-colors">
      <div>
        <Image
          width={500}
          height={300}
          className="rounded-md"
          src={props.image}
          alt={props.title}
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="text-masaud-dev-pink">{props.year}</div>
        </div>
        <div className=" text-lg 2xl:text-xl mt-2">{props.title}</div>
        <div className=" text-masaud-dev-light-grey font-light mt-2">
          {props.tagline}
        </div>
      </div>
      <div>
        <div className="flex items-center mt-4">
          <Button
            // onClick={() => {
            //   ReactGA.event({
            //     category: "Blog Card",
            //     action: "View Blog",
            //     label: props.title,
            //   });
            // }}
            className="mx-1 flex-1"
            // id={`view-project-button-${cardId}`}
          >
            <span data-cursor="true" className="mr-2">
              View Project
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={"14px"}
              height={"14px"}
              fill={"currentcolor"}
            >
              <g data-name="Layer 2">
                <g data-name="external-link">
                  <rect width="24" height="24" opacity="0"></rect>
                  <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z"></path>
                  <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z"></path>
                </g>
              </g>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
