import React from "react";
import styled from "styled-components";

const SmallFilterButton = (props) => {
  const { children, active } = props;

  const styles = { active };

  return <Button {...styles}>{children}</Button>;
};

SmallFilterButton.defalutProps = {
  active: false,
};

const Button = styled.button`
  padding: 8px;
  font-size: 12px;
  ${(props) => props.active && `color : #7692E4`};
`;

export default SmallFilterButton;
