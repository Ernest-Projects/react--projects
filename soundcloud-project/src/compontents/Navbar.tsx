
// lucide icons library import 
import {Mail, Bell, Ellipsis, ChevronDown} from 'lucide-react';

export const Navbar = () => {
  const buttsNavbar = [ 
    { content: "Home" },
    { content: "Feed" },
    { content: "Library" },
    { content: "Try Artist Pro" },
    { content: "For Artists" },
    { content: "Upload" },
  ];

  
  const butts = [];
  for (let i = 0; i < 6; i++) {
    butts.push(
      <>
        <button className="w-[100%] font-bold transition duration-100 focus:text-orange-500 h-[100%] text-[rgb(72,72,72)] hover:text-white text-bold ">
          {buttsNavbar[i].content}{" "}
        </button>
      </>
    );
}

const iconsStyles = "text-[rgb(72,72,72)] border-none hover:text-white place-self-center";
const icons = [Mail, Bell, Ellipsis];
const iconsProps = {
    strokeWidth: 1.2,
    className: iconsStyles,
    size: 20
}

  

  const left = butts.slice(0, butts.length / 2);
  const right = butts.slice(butts.length / 2);

  return (
    <>
      <main
        style={{ justifyContent: "space-around" }}
        className={`w-[90vw] h-[3rem] border  place-self-center gap-[1rem]  bg-transparent border align-center flex justify-center flex-rows fixed top-[0%] `}
      >

        <section className="border gap-[1rem] h-full  relative grid grid-cols-3  grid-rows-1">
          {left}
        </section>
        <input
          type="text"
          placeholder="enter song name"
          className="h-[80%]  p-[1rem]
 bg-[rgb(48,48,48)] place-self-center active:border focus:outline-violet-500 focus:outline-2 duration-200 transition rounded-[.4rem] outline-none text-white hover:outline-none"
        />
        <section className="border h-full w-[20%] relative grid grid-cols-3  grid-rows-1">
          {right}
        </section>
        <div className={`border h-[100%] gap-[1rem] aspect-[2/1] group border justify-center align-center flex flex-rows `}>

        <p className={`overflow-[hidden] border flex place-self-center justify-center align-center overflow-hidden h-[90%] rounded-[10rem]`}>
        <img src="../../public/navbarImg.jpg" alt="" style ={{objectFit: "fill"}} className={` aspect-[1/1] h-full`} />
        </p>
                <ChevronDown strokeWidth={1.2} className={`text-[rgb(72,72,72)] border-none group-hover:text-white place-self-center`} size = {25}/>
        <div></div>
        </div>
        <section className={`flex flex-rows border gap-[1rem]`}>

        {icons.map((Icon, index) => (
        <Icon key = {index} {...iconsProps} />
        ))}
        </section>
      </main>
    </>
  );
};
