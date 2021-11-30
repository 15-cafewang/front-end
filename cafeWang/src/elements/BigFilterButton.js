import React from "react";
import styled from "styled-components";

const BigFilterButton = (props) => {
  const { children, active, noneBorderTop, _onClick } = props;

  const styles = { active, noneBorderTop };

  return (
    <Button {...styles} onClick={_onClick}>
      {children}
    </Button>
  );
};

BigFilterButton.defalutProps = {
  active: false,
  noneBorderTop: false,
  _onClick: () => {},
};

const Button = styled.button`
  width: 50%;
  height: 48px;
  border: 1px solid #ededed;
  border-left: none;
  border-right: none;
  font-family: 'Pretendard-Regular';

  ${(props) => props.noneBorderTop && `border-top : none `};
  ${(props) => props.active && `border-bottom : 2px solid #000000 `};
`;

export default BigFilterButton;
