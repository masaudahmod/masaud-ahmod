import { ButtonHTMLAttributes } from "react";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      data-cursor={true} // This is for custom cursor
      {...props}
      className={`font-light whitespace-nowrap flex justify-center items-center bg-brand-navyLight px-3 py-1 border border-brand-navyMuted rounded-md transition-colors ${
        props.disabled
          ? "opacity-50"
          : "hover:border-brand-accent hover:text-brand-accent"
      } ${props.className ? props.className : ""}`}
    />
  );
};

const Hr = ({ width = "100%" }) => {
  return (
    <div className="flex justify-center">
      <div
        style={{ height: "1px", width }}
        className="my-6 bg-brand-navyMuted w-full"
      ></div>
    </div>
  );
};
export { Button, Hr };
