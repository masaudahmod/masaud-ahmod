import { ButtonHTMLAttributes } from "react";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
      <button
        data-cursor={true} // This is for custom cursor
        {...props}
        className={`font-light whitespace-nowrap flex justify-center items-center bg-v9-secondary-black px-3 py-1 border-2 rounded-md border-opacity-5 transition-colors ${
          props.disabled
            ? "opacity-50"
            : "hover:border-v9-pink hover:border-opacity-30 "
        } ${props.className ? props.className : ""}`}
      />
    );
  };
  
  export { Button };
  