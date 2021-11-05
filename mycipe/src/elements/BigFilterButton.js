import React from "react";
import styled from "styled-components";

const BigFilterButton = (props) => {
  const { children, active, noneBorderTop } = props;

  const styles = { active, noneBorderTop };

  return <Button {...styles}>{children}</Button>;
};

BigFilterButton.defalutProps = {
  active: false,
  noneBorderTop: false,
};

const Button = styled.button`
  width: 50%;
  height: 48px;
  border: 1px solid #ededed;
  border-left: none;
  border-right: none;

  ${(props) => props.noneBorderTop && `border-top : none `};
  ${(props) => props.active && `border-bottom : 2px solid #7692E4 `};
`;

export default BigFilterButton;
