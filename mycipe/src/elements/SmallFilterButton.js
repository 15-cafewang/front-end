import React from "react";
import styled from "styled-components";

const SmallFilterButton = (props) => {
  const { children, active, _onClick } = props;

  const styles = { active };

  return (
    <Button {...styles} onClick={_onClick}>
      {children}
    </Button>
  );
};

SmallFilterButton.defalutProps = {
  active: false,
  _onClick: () => {},
};

const Button = styled.button`
  padding: 8px;
  font-size: 12px;
  ${(props) => props.active && `color : #7692E4`};
`;

export default SmallFilterButton;
