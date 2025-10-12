export const GlobalButton = ({text}: any) => {
  return (
    <>
      <button className="text-sm text-white h-fit px-2 py-1 place-self-center hover:text-[rgb(100,100,100)] rounded-[.2rem] bg-[rgb(48,48,48)] text-[rgb(150,150,150)]">
        {text}
      </button>
    </>
  );
};
