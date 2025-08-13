type AuthorClass = {
  authorClass: string;
  authorTable: string;
  authorMobile: string;
};
type AuthorProps = {
  authorStyles: AuthorClass;
  isResized: boolean;
  mode: boolean;
  nameAuthor: string
};
export default function Author ({ authorStyles, isResized, mode, nameAuthor }: AuthorProps)  {
  return (
    <>
      <p
        style={{ color: mode == true ? "black" : "white" }}
        className={`${authorStyles.authorClass} ${
          isResized == true
            ? authorStyles.authorTable
            : authorStyles.authorMobile
        }`}
      >
       {nameAuthor}
      </p>
    </>
  );
};
