interface TrackProps {
  image: string;
  type: string;
  title: {
    header: string;
    subtitle: string;
  };
}
type TrackTitleProps = {
  trackData: TrackProps;
};

export const TrackTitle = ({ trackData }: TrackTitleProps) => {
  return (
    <>
      <div className="flex h-full  flex-col   overflow-[hidden]  w-full">
        <div className=" w-full h-full  rounded-[.2rem] overflow-hidden">
          <img
            src={trackData.image}
            className="w-full h-full aspect-[1/1]"
            style={{ objectFit: "fill" }}
            alt=""
          />
        </div>
        <p className="font-bold whitespace-nowrap leading-[1.2rem] p-[.2rem] lg:text-[14px] md:text-[12px] overflow-hidden text-ellipsis lg:w-[10rem] md:w-[8rem]  text-white ">
          <span>
            {trackData.title.header} <br />{" "}
            <span className="text-[rgb(152,152,152)] text-ellipsis p-0 m-0 whitespace-nowrap">
              {trackData.title.subtitle}
            </span>
          </span>
        </p>
        {/* <p className="text-white"> {item}</p> */}
      </div>
    </>
  );
};
