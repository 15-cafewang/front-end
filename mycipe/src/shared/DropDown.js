import React from "react";
import styled from "styled-components";

const DropDown = (props) => {
  const { _ref, className } = props;

  return (
    <Menu ref={_ref} className={className}>
      <p>최신순</p>
      <p>인기순</p>
      <p>가격순</p>
    </Menu>
  );
};

const Menu = styled.nav`
  background: #ffffff;
  border-radius: 16px;
  position: absolute;
  top: 40px;
  width: 200px;
  box-shadow: 0 1px 5px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-30px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateZ(0);
  }
`;

export default DropDown;
