import styled from "styled-components";

type AuthorProps = {
  mode: boolean;
  nameAuthor: string
};

const AuthorStyles = styled.p<{mode: boolean}>`

transition: all .2s ease;
  position: absolute; 
  bottom: 2rem;
  transition: all .3s ease;
  user-select: none;
  left: 2rem;
  color: ${({mode}) => mode ==  true ? "black": "white"};
  font-weight: 700; font-family: "monospace";
  font-size: 2rem;
`;

export default function Author ({ mode, nameAuthor }: AuthorProps)  {
  return (

    <>
      <AuthorStyles mode = {mode}>
       {nameAuthor}
      </AuthorStyles>
    </>

  );
};