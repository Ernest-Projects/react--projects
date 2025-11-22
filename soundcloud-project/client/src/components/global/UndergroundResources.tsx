// import { a, button, div } from "motion/react-client";


export const UndergroundResources = () => {
    const data = ["Legal", "Privacy",
        "Cookie Policy", "Cookie Manager","Imprint", "Artist Resources","Newsroom", "Charts", "Transparency Reports"];
  return (
    <>
      <main className=" text-[14px] flex flex-col gap-[1rem] text-gray-500 py-[3rem] pb-[6.5rem]">
        <div className="w-fit flex flex-wrap">

        {data.map((item, index) => (
          <span key = {index} className="">
            <a className="text-[rgb(152,152,152)] transition hover:text-[rgb(48,48,48)]">{item}</a>
            <span className="font-bold mx-[.3rem]">{index == data.length - 1 ? "" : "·"}</span>
           </span>
        ))}
        </div>
        <section className="text-white">
          <span>Language</span>
          <span className="text-blue-500"> <a href="">English (US)</a> </span>
        </section>

      </main>
    </>
  );
};
