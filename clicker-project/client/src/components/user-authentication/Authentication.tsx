
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

interface AuthenticationProps  {
 userLogged: boolean;
 loggedOrRegistered: boolean;

 onLoggedOrRegistered: () => void;
 onUserLogged: () => void; // add parameter
}
type UserProps = {
    user_name: string,
    user_email: string,
    user_password: string,
    confirm_user_password: string
}

export const Authentication = ({loggedOrRegistered, onLoggedOrRegistered, userLogged, onUserLogged}: AuthenticationProps) => {
    const [userName, setUserName] = useState<string>("");
    const [userData, setUserData] = useState<UserProps>({user_name: "", user_email: "", user_password: "", confirm_user_password: ""})

    const handleSubmitUser =() => {

        const empty = Object.values(userData).some(item => item === "")
        if(empty) {
            alert("please, fill all fields!")
             return 
        } 
        // need to add boolean parameter for login/registration
            onUserLogged();    
    
    }
    const handleSetUserData = (type:string, data: string ) => {
        setUserData(prev => ({...prev, [type]: data}))
        
    }


    useEffect(() => {
        console.log("Name: ", userData.user_name);
        console.log("Email: ", userData.user_email)
        console.log("password: ", userData.user_password)
        console.log("confirm password: ", userData.confirm_user_password)
    }, [userData])

    return <>

    <div className="border-red-500 px-[2rem] w-full h-full bg-red rounded-[1rem]">
    <section className="gap-[1rem] flex flex-col">
        <header className="text-2xl pl-0 p-[1rem] font-bold"> Are you new here? </header>
        <form action="" className="">
            <header>Username: </header>
        <input className="border border-[rgba(15,18,51,1)] focus:outline-none w-full rounded-[.25rem] border-[2px]" type="text" placeholder="Enter user name" onChange={(e) => handleSetUserData("user_name", e.target.value)} />
        </form>
         <form action="">
            <header>Email: </header>
        <input className="border border-[rgba(15,18,51,1)] focus:outline-none w-full rounded-[.25rem] border-[2px]" type="text" placeholder="Enter user email" onChange={(e) => handleSetUserData("user_email", e.target.value)} />
        </form>
          <form action="">
            <header>Email: </header>
        <input className="border border-[rgba(15,18,51,1)] focus:outline-none w-full rounded-[.25rem] border-[2px]" type="text" placeholder="Enter user password" onChange={(e) => handleSetUserData("user_password", e.target.value)} />
        </form>
           <form action="">
            <header>Confirm password: </header>
        <input className="border border-[rgba(15,18,51,1)] focus:outline-none w-full rounded-[.25rem] border-[2px]" type="text" placeholder="Confirm user password" onChange={(e) => handleSetUserData("confirm_user_password", e.target.value)} />
        </form>



    </section>
    <section className="w-full h-fit gap-[1rem] flex flex-col my-[2rem]">
        <button className="bg-[rgba(15,18,51,1)] rounded-[.25rem] text-white font-bold py-[1rem]" onClick = {() => handleSubmitUser()}>{loggedOrRegistered ? "Login" : "Register"}</button>
        <button type = "button" onClick = {()=> onLoggedOrRegistered()}> {loggedOrRegistered ? "You don't have an acccount?" : "Do you have an account?"} <a className="text-blue-600" href="">{loggedOrRegistered ? "Register" : "Log in"}</a> </button>

    </section> 
    </div>
    </>
}