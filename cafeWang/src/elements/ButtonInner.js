import React from "react";
import styled, { css } from "styled-components";
const ButtonInner = (props) => {
  const { children, small, height, margin } = props;
  const styles = { small, height, margin };

  return <Inner {...styles}>{children}</Inner>;
};

ButtonInner.defaultProps = {
  small: false,
  height: "32px",
  margin: "",
};

const Inner = styled.div`
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};

  ${(props) =>
    props.small &&
    css`
      width: 100%;
      display: flex;
      justify-content: flex-end;
    `}
`;

export default ButtonInner;
