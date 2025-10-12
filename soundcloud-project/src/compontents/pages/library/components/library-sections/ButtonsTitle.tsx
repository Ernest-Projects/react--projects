import { libraryPages } from "../../confings/libraryConfigs";

import {motion} from "motion/react"

import {useRef, useState} from "react"

import {setSelectButton} from "../../../../../redux/storages/librarySlice"
import { useLibraryAppDispatch } from "../../../../../redux/hooks/libraryHook";
import { useNavigate } from "react-router-dom";

 const ButtonsTitle = () => {
     const sectionRef = useRef<HTMLDivElement>(null);
        const [lineWidth, setLineWidth] = useState<number>(0);
        const [linePosition, setLinePosition] = useState<number>(0);
        const [isSelectedButton, setIsSelectedButton] = useState(Array.from({length: 7}, (_, i) => ({isSelected: i == 0})))
    
        const dispatch = useLibraryAppDispatch()
    

        // animate line for title buttons
        const handleSetLine = (e: any, id:number) => {
            dispatch(setSelectButton({id: id}));
            setIsSelectedButton((prev) => prev.map((_, index) => index == id ? {isSelected: true} : {isSelected:false} ))
            if (!sectionRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const parentRef = sectionRef.current?.getBoundingClientRect();
            const parentX = (rect.left) - parentRef.left;
            
            setLinePosition(parentX);
            setLineWidth(e.target.clientWidth);
        }
        
        const navigate = useNavigate()
        const handleComposeHandlers = (path: string, {e, index}:{e:any, index:number}) =>{
            handleSetLine(e,index)
            handleSetLibraryPage(path)
        }

        const handleSetLibraryPage = (path:string) => {
            navigate(`/you/${path}`, {replace: false})

        }
return (<>
<main>
 <section  className = {`  text-xl flex flex-col  text-white  `} >

        <div style = {{transformOrigin: "center", transformStyle:"preserve-3d", transform:"rotateX(-25deg)"}} ref = {sectionRef} className="gap-[1.5rem] perspective-[50px]  w-[60%] pt-[2rem] h-fit justify-between relative flex"> 
        {libraryPages.map((item, index) => (
            <button onClick = {(e) => handleComposeHandlers(item.path, {e, index})} style = {{transformOrigin: "center", transformStyle:"preserve-3d"}} className={`text-xl  ${isSelectedButton[index].isSelected ? "text-white" : "text-[rgb(152,152,152)]"} perspective-[150px] hover:text-white text-[rgb(152,152,152)] font-bold`} key = {index}>{item.content}</button>
        ))} 
      <motion.div animate = {{left:`${linePosition}px`, width: (lineWidth ? lineWidth: "6rem")}}  className="border absolute w-[5rem] bottom-[-.5rem] border-white  h-[1px] bg-white"></motion.div>
        </div>
    </section>
</main>
</>);
};

export default ButtonsTitle