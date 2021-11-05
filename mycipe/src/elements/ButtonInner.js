import React from "react";
import styled, { css } from "styled-components";
const ButtonInner = (props) => {
  const { children, small, height } = props;
  const styles = { small, height };

  return <Inner {...styles}>{children}</Inner>;
};

ButtonInner.defaultProps = {
  small: false,
  height: "32px",
};

const Inner = styled.div`
  height: ${(props) => props.height};

  ${(props) =>
    props.small &&
    css`
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin: 12px -10px;
    `}
`;

export default ButtonInner;
