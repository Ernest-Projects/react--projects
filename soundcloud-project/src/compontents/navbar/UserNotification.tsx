
import { GlobalButton } from "../glo/GlobalButton"
import {User} from 'lucide-react'
export const UserNotification = () => {
    return (<>
    <section className=" relative w-[22rem] h-[4rem] place-self-center p-2 gap-[.2rem] flex  justify-between flex-cols ">
        <div className="rounded-[10rem] relative h-[100%]  aspect-[1/1] overflow-[hidden] overflow-hidden">
        <img  style = {{objectFit:"fill"}} className="w-[100%] rounded-[10rem] h-[100%]" src="../../../../public/notificationIcon.png" alt="" />
        </div>
        <div className=" text-[rgb(152,152,152)] place-self-center h-[90%] font-light relative w-fit flex justify-center align-center  grid grid-rows-2 grid-cols-1 ">
        <header className="text-[12px] text-white font-bold">Distort1on <span className="text-[12px] text-[rgb(152,152,152)] font-light" >started following you</span></header>
        <div className=" text-[rgb(152,152,152)]  gap-[.4rem] flex flex-cols  ">
            <User size ={15}></User>
             <p className="text-[12px] text-left">June 2024</p>
             </div>
        </div>
        <GlobalButton text = {"following"}></GlobalButton>
    </section>
    </>)
}