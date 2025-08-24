import { useEffect, useState } from "react";

type ShopButtonProps = {
  onSetVisible: () => void;
  mode: boolean;
  width: number;
};

export const ShopButton = ({ onSetVisible, mode, width }: ShopButtonProps) => {
  const [animate, setAnimate] = useState(false);

  // 'new-effect' for shop button
  useEffect(() => {
    const interval = setInterval(
      () => {
        setAnimate((prev) => !prev);
      },
      10000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        className={`overflow-hidden absolute z-[10] bottom-20 w-[20rem] h-[5rem] place-self-center`}
      >
        <button
          onClick={() => onSetVisible()}
          className={`${
            width < 1280 ? "active:bg-red-500" : ""
          } text-3xl font-mono ${
            mode === true
              ? "bg-[rgb(240,240,240)] hover:shadow-[inset_0_-10px_40px_1px_rgb(180,180,180)] text-black"
              : "bg-[rgb(20,20,20)] hover:shadow-[inset_0_-10px_40px_1px_rgb(50,50,50)] text-white"
          } duration-100 w-full h-full  active rounded-[1rem] absolute`}
        >
          <span className="font-mono">Open shop 💎</span>
        </button>
        <div
          className={`${
            animate === true
              ? "left-[125%] opaticy-[.5]"
              : "left-[-27%] opacity-[0.2]"
          } ${
            mode === false ? "bg-[rgb(240,240,240)]" : "bg-[rgb(255,255,255)]"
          } opacity-[0.5]   duration-1000 w-[10%]  rotate-[45deg] h-[200%]  top-[-50%] absolute`}
        ></div>
      </section>
    </>
  );
};
