import { libraryPages } from "../../library-confing/libraryConfigs";

import { motion } from "motion/react";

import { useEffect, useRef, useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LibraryTabs = () => {  
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState<number>(0);
  const [linePosition, setLinePosition] = useState<number>(0);

  const tabIndexes = useRef<(HTMLButtonElement | null)[]>([]);
  
  // for navigating
  const navigate = useNavigate();

  // for returning the current location of this React compone
  const location = useLocation();

  useEffect(() => {

    console.log(location.pathname);
    const activeButtonIndex = libraryPages.findIndex((item) =>location.pathname == `/you/${item.path}`);
    console.log("index: ", activeButtonIndex);

    if (activeButtonIndex != -1) {
    handleSetLine(activeButtonIndex);
    }
     // handleSetLine()
    
  }, [location.pathname])
  
  
  
  // animate line for active title buttons
  const handleSetLine = (index: number) => {
    if (!sectionRef.current) return;

    const button = tabIndexes.current[index];    
    if(!button) return;

    const rect = button.getBoundingClientRect();
    const parentRef = sectionRef.current?.getBoundingClientRect();
    const parentX = rect.left - parentRef.left;

    setLinePosition(parentX);
    setLineWidth(button.clientWidth);
  };

  return (
    <>
      <main>
        <section className={`  text-xl flex flex-col  text-white  `}>
          <div
            style={{
              transformOrigin: "center",
              transformStyle: "preserve-3d",
              transform: "rotateX(-25deg)",
            }}
            ref={sectionRef}
            className="gap-[1.5rem] perspective-[50px] font-semibold w-[60%] pt-[2rem] h-fit justify-between relative flex"
          >
            {libraryPages.map((item, index) => (
              <button data-cy = "library-page-button" data-index = {index}
                key={index}
                ref = {(el) => {tabIndexes.current[index] = el}}
                onClick={() => {
                  navigate(`/you/${item.path}`, { replace: true });
                }}
                className= {`text-[rgb(152,152,152)] h-fit w-fit ${location.pathname == `/you/${item.path}` && "text-white"} focus-pointer hover:cursor-pointer`}
              >
                {item.content}
              </button>

              // <button onClick = {(e) => handleComposeHandlers(item.path, {e, index})} style = {{transformOrigin: "center", transformStyle:"preserve-3d"}} className={`text-xl  ${isSelectedButton[index].isSelected ? "text-white" : "text-[rgb(152,152,152)]"} perspective-[150px] hover:text-white text-[rgb(152,152,152)] font-bold`} key = {index}>{item.content}</button>
            ))}
            <motion.div
              animate={{
                left: `${linePosition}px`,
                width: lineWidth ? lineWidth : "6rem",
              }}
              className="border absolute w-[5rem] bottom-[-.5rem] border-white  h-[1px] bg-white"
            ></motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LibraryTabs;
