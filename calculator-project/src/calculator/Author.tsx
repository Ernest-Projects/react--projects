type AuthorClass = {
  authorClass: string;
  authorTable: string;
  authorMobile: string;
}
type AuthorProps =  {
    authorStyles: AuthorClass;
    isResized: boolean
}
export const Author = ({authorStyles, isResized}: AuthorProps) => {
    return (<>
      <p className={`${authorStyles.authorClass } ${isResized == true ? authorStyles.authorTable : authorStyles.authorMobile}`}>Calculator by Ernest</p>
    </>)
}