import { useAuthAppSelector } from "@redux-hook/authHook"





export const TestComponent = () => {

    // const {userEmail, userAge, userDisplayName, userGender, userPassword} = useAuthAppSelector(state => state.authorization);
    console.log( "AUTHORIZATION REDUCER: ",  useAuthAppSelector(state => state.authorization));

  // --------------------------------------------------------
  // ALL INPUT FIELDS
  const userEmail = useAuthAppSelector(
    (state) => state.authorization.userInputData.userEmail
  );

  const userPassword = useAuthAppSelector(
    (state) => state.authorization.userInputData.userPassword
  );
    
  const userDisplayName = useAuthAppSelector(
    (state) => state.authorization.userInputData.userDisplayName
  );

    const userAge = useAuthAppSelector(
    (state) => state.authorization.userInputData.userAge
  );

    const userGender = useAuthAppSelector(
    (state) => state.authorization.userInputData.userGender
  );

  const provider = useAuthAppSelector((state) => state.authorization.provider);

  const validErrors = useAuthAppSelector((state) => state.authorization.validationErrors);
    const windowId = useAuthAppSelector((state) => state.authorization.authorizationWindowId);

  // --------------------------------------------------------

    return (<>
    
    

    <div className="absolute flex bg-white text-black flex-col gap-4 w-[20rem] h-fit left-4 top-4"> 
        <p>user email: {userEmail}</p>
        <p>window ID: {windowId}</p>

        <p>user password: {userPassword}</p>
        <p>user gender: {userGender}</p>
        <p>user name: {userDisplayName}</p>
        <p>user age: {userAge}</p>
        <p>provider: {provider}</p>
        <p>errors: {Object.values(validErrors)}</p>


    </div>
    </>)
}