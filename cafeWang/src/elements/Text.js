import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, color, size, margin, bold, width } = props;

  const styles = {
    color,
    size,
    margin,
    bold,
    width,
  };

  return (
    <React.Fragment>
      <DefaultText {...styles}> {children} </DefaultText>
    </React.Fragment>
  );
};

Text.defaultProps = {
  children: null,
  color: "black",
  size: "14px",
  margin: "auto",
  bold: false,
  width: "auto",
};

const DefaultText = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  font-family: "Pretendard-Medium";
  font-weight: ${(props) => props.weight};
  width: ${(props) => props.width};
`;

export default Text;
