import React, { useEffect, useRef } from "react";
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
  const hidePopUp = (e) => {
    if (e.code === "Escape") {
      //모달 닫기
      setPopUp(false);
    }

    if (e.code === "Enter") {
      // 버튼 누를시 실행되는 함수 호출
      _onClick();
    }
  };

  const popUpRef = useRef();

  useEffect(() => {
    if (popUp) {
      window.addEventListener("keydown", hidePopUp);
      return () => {
        window.removeEventListener("keydown", hidePopUp);
      };
    }
  }, [popUp]);

  return (
    <PopUpContainer active={popUp} ref={popUpRef}>
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
  /* box-shadow: 1px 1px 5px #000; */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16);
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
