import React from "react";

interface SectionHeadingProps {
  number: string;
  title: string;
  className?: string;
}

export default function SectionHeading({
  number,
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      data-cursor="true"
      className={`section-heading ${className}`}
    >
      <span className="section-heading-number">&gt; {number}.</span>
      <span className="section-heading-title">{title}</span>
      <div className="section-heading-line" />
    </div>
  );
}
