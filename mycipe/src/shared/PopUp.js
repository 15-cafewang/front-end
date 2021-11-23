import React from "react";
import styled, { css } from "styled-components";

const PopUp = ({
  popUp,
  setPopUp = () => {},
  message,
  isButton,
  buttonName,
  _onClick = () => {},
}) => {
  return (
    <PopUpContainer active={popUp}>
      <Text>{message}</Text>

      {isButton && (
        <ButtonInner>
          <Button
            onClick={() => {
              setPopUp(false);
            }}
          >
            취소
          </Button>

          <Button
            onClick={() => {
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

  background: #fff;

  //글만 있을때
  justify-content: center;
  padding: 44px;
`;

const Text = styled.p`
  font-size: 14px;
  text-align: center;

  //버튼 있을때
  /* height: 72px;
  line-height: 72px; */
`;

const ButtonInner = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  color: ${(props) => (props.active ? "#7692E4" : "#000")};
`;

export default PopUp;
