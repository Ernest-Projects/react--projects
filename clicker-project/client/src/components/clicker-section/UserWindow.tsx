
import { useState } from "react"
import type { UserDataProps } from "../../types/withTypes"


type UserWindowProps = {
    user: UserDataProps | undefined,
    onSetLogout: () => void
}

export const UserWindow: React.FC<UserWindowProps> = ({user, onSetLogout}) =>{
    return <>
        <section className=" z-[100] w-[8rem] h-[7rem] flex jusity-center flex-col bg-[rgb(60,60,60)] top-[6rem] right-[1rem] rounded-[.2rem] absolute ">
        <header className="place-self-center font-monospace px-[2rem] pt-[1rem] font">{String(user?.data.user_name)}</header>
                  <button onClick = {() => onSetLogout()}
        className={` z-1 duration-200 place-self-center w-[6rem] active:scale-[.95] right-[1rem]  rounded-[10rem] p-[.8rem] font-mono bg-[rgb(20,20,20)]`}
      >
        Logout </button>
        </section>
    </>
}