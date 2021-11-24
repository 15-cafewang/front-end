import React from "react";
import styled, { css } from "styled-components";
import { Button } from "../elements/index";

const PopUp = ({
  popUp = false,
  setPopUp = () => {},
  message = "",
  isButton = false,
  buttonName = "",
  _onClick = () => {},
}) => {
  return (
    <PopUpContainer active={popUp}>
      <Text isButton={isButton}>{message}</Text>

      {isButton && (
        <ButtonInner>
          <Button
            width="90px"
            height="28px"
            bg="#ededed"
            _onClick={() => {
              setPopUp(false);
            }}
          >
            취소
          </Button>

          <Button
            width="90px"
            height="28px"
            color="#fff"
            _onClick={() => {
              setPopUp(false);
              _onClick();
            }}
          >
            {buttonName}
          </Button>
        </ButtonInner>
      )}
    </PopUpContainer>
  );
};

const PopUpContainer = styled.div`
  //공통
  position: fixed;
  z-index: 100;
  top: 100px;
  left: 50%;
  transform: translate(-50%, -55%);
  transition: all 100ms ease-in;
  border-radius: 6px;
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 280px;
  height: 132px;

  ${(props) =>
    props.active &&
    css`
      transform: translate(-50%, -50%);
      opacity: 1;
    `}

  background:#fff;

  //글만 있을때
  justify-content: center;
  padding: 44px;
`;

const Text = styled.p`
  font-size: 14px;
  text-align: center;
  word-break: keep-all;

  //버튼 있을때
  ${(props) =>
    props.isButton &&
    css`
      height: 72px;
      line-height: 72px;
    `}
`;

const ButtonInner = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
`;

export default PopUp;
