import { ChevronDown } from "lucide-react";
import { useAuthAppDispatch, useAuthAppSelector } from "@redux-hook/authHook";
import { setAuthorizationWindowId } from "@redux-storage/authSlice";

export const PreviousWindowButton = () => {
  const dispatch = useAuthAppDispatch();
  const authorizationWindowId = useAuthAppSelector(
    (state) => state.authorization.authorizationWindowId
  );

  const handleGetBack = () => {
    if (authorizationWindowId == 4) {
      dispatch(
        setAuthorizationWindowId({ windowId:  1 }) 
      );
    }else {
      dispatch(setAuthorizationWindowId({ windowId:  authorizationWindowId -1 }))

    }
  };
  return (
    <>
      <section
        style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr" }}
        className="align-center pb-[1.5rem]"
      >
        <button
          onClick={handleGetBack}
          style={{ transform: "rotate(90deg)" }}
          className=" bg-[rgb(48,48,48)]  justify-self-start aspect-[1/1] w-[2.5rem] h-fit rounded-[10rem] text-white"
        >
          <ChevronDown
            strokeWidth={1.5}
            className={`
            "text-white"
             border-none place-self-center`}
            size={30}
          />
        </button>
        <header className="justify-self-center place-self-center text-white font-semibold">
         
          {authorizationWindowId == 2 || authorizationWindowId == 1
            ? "Sign in or create an account "
            : authorizationWindowId == 3 ? "Welcome back!" : "Tell us more about you"}

        </header>
      </section>
    </>
  );
};
