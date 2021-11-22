import { React, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as HomeIcon } from "../assets/icon/BottomNavIcon/home.svg";
import { ReactComponent as ActiveHomeIcon } from "../assets/icon/BottomNavIcon/homeActive.svg";

import { ReactComponent as CafeIcon } from "../assets/icon/BottomNavIcon/cafe.svg";
import { ReactComponent as ActiveCafeIcon } from "../assets/icon/BottomNavIcon/cafeActive.svg";

import { ReactComponent as PlusIcon } from "../assets/icon/BottomNavIcon/plus.svg";

import { ReactComponent as BoardIcon } from "../assets/icon/BottomNavIcon/board.svg";
import { ReactComponent as ActiveBoardIcon } from "../assets/icon/BottomNavIcon/boardActive.svg";

import { ReactComponent as MyIcon } from "../assets/icon/BottomNavIcon/my.svg";
import { ReactComponent as ActiveMyIcon } from "../assets/icon/BottomNavIcon/myActive.svg";

import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";

import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../redux/Modules/modalSlice";

const BottomNav = (props) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const location = useLocation().pathname; // URL이 변경될떄마다 새로운 URL리턴.

  const loginUserInfo = useSelector((state) => state.user);

  const loginUserNickname = loginUserInfo.userInfo.nickname;

  useEffect(() => {
    const DetectOutsideClick = () => {
      dispatch(setActive(!isActive));
    };

    if (isActive) window.addEventListener("click", DetectOutsideClick);
    return () => {
      window.removeEventListener("click", DetectOutsideClick);
    };
  }, [dispatch, isActive]);

  const ClickedModal = () => {
    dispatch(setActive(!isActive));
  };

  if (!loginUserInfo.isLogin) return null;

  return (
    <>
      <BottomNavInner>
        {isActive ? (
          <PlusModal>
            <ModalContentInner>
              <ModalContent
                onClick={() => {
                  history.push("/recipeboard/write");
                }}
              >
                레시피 공유하기
              </ModalContent>
              <ModalContent
                onClick={() => {
                  history.push("/bulletinboard/write");
                }}
              >
                게시글 작성하기
              </ModalContent>
            </ModalContentInner>
          </PlusModal>
        ) : (
          ""
        )}

        <NavButtonInner>
          <NavButton
            onClick={() => {
              history.push("/main");
            }}
          >
            {location === "/main" ? <ActiveHomeIcon /> : <HomeIcon />}
          </NavButton>

          <NavButton
            onClick={() => {
              history.push("/recipeboard");
            }}
          >
            {location === "/recipeboard" ? <ActiveCafeIcon /> : <CafeIcon />}
          </NavButton>

          <NavButton onClick={ClickedModal}>
            <PlusIcon />
          </NavButton>

          <NavButton
            onClick={() => {
              history.push("/bulletinboard");
            }}
          >
            {location === "/bulletinboard" ? (
              <ActiveBoardIcon />
            ) : (
              <BoardIcon />
            )}
          </NavButton>

          <NavButton
            onClick={() => {
              history.push(`/usermain/${loginUserNickname}`);
            }}
          >
            {location === `/usermain/${loginUserNickname}` ? (
              <ActiveMyIcon />
            ) : (
              <MyIcon />
            )}
          </NavButton>
        </NavButtonInner>
      </BottomNavInner>
    </>
  );
};

export const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  width: 375px;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`;

const BottomNavInner = styled.div`
  width: 375px;
  position: fixed;
  bottom: 0;
  z-index: 4;
  left: 50%;
  transform: translate(-50%, 0);
`;

const PlusModal = styled.div`
  padding: 24px 0px;
  border-radius: 40px 40px 0px 0px;

  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContentInner = styled.div`
  height: 88px;
  margin: 10px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalContent = styled.button`
  padding: 12px;
  width: 100%;
  &:hover {
    background-color: #7692e4;
  }
`;

const NavButtonInner = styled.div`
  background: #f8f8fa;
  display: flex;
  justify-content: center;
`;

const NavButton = styled.button``;

export default BottomNav;
