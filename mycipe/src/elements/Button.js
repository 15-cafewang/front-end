import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { children, bg, width, margin, height, _onClick, border_radius } =
    props;

  const styles = {
    bg,
    width,
    margin,
    height,
    border_radius,
  };

  return (
    <React.Fragment>
      <DefaultBtn {...styles} onClick={_onClick} type="button">
        {children}
      </DefaultBtn>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  bg: "#7692E4",
  width: "320px",
  margin: "auto",
  height: "48px",
  _onClick: () => {},
  border_radius: "6px",
};

const DefaultBtn = styled.button`
  display: block;
  border: none;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.border_radius};
`;

export default Button;
