import React from "react";
import styled from "styled-components";
import { Button } from "../elements/index";

const Blank = ({ message, isButton, ButtonText, _onClick }) => {
  if (isButton) {
    return (
      <>
        <BlankContent>{message}</BlankContent>
        <Button
          width="100px"
          height="40px"
          color="#fff"
          margin="10px 0px 0px 0px"
        >
          {ButtonText}
        </Button>
      </>
    );
  } else {
    return <BlankContent>{message}</BlankContent>;
  }
};

Blank.defaultProps = {
  message: "",
  _onClick: () => {},
};

const BlankContent = styled.p`
  margin-top: 152px;
  color: #767676;
  text-align: center;
`;
export default Blank;
