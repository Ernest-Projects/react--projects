type AuthorClass = {
  authorClass: string;
  authorTable: string;
  authorMobile: string;
}
type AuthorProps =  {
    authorStyles: AuthorClass;
    isResized: boolean;
    mode: boolean
}
export const Author = ({authorStyles, isResized, mode}: AuthorProps) => {
    return (<>
      <p style = {{color: mode == true ? "black" : "white"}} className={`${authorStyles.authorClass } ${isResized == true ? authorStyles.authorTable : authorStyles.authorMobile}`}>Calculator by Ernest</p>
    </>)
}