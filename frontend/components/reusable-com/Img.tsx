import React from "react";

interface imgProps {
    src: string;
    alt: string;
    className: string;
}

export default function Img(props: imgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} className={props.className} />
  );
}
