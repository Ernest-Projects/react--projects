type AuthorProps =  {
    authorClass: string;
}
export const Author = ({authorClass}: AuthorProps) => {
    return (<>
      <p className={authorClass}>Calculator by Ernest</p>
    </>)
}