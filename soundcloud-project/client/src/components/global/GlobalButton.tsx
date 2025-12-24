import  type { HTMLProps } from "react";

interface GlobalButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string,
  bg:string,
  color: string
}

export const GlobalButton = ({text, bg, color, ...attrs}: any) => {
  return (
    <>
      <button role = "button" {...attrs} style = {{color: `${color}`, background: `${bg}`}} className="text-sm group text-white  h-fit px-2 py-[.4rem] place-self-center hover:text-[rgb(100,100,100)] rounded-[.2rem] bg-[rgb(48,48,48)] text-[rgb(150,150,150)]">
        <p className="group-hover:opacity-[.5]">
        {text}

        </p>
      </button>
    </>
  );
};
