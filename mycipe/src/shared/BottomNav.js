import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as HomeIcon } from "../assets/icon/BottomNavIcon/home.svg";
import { ReactComponent as ActiveHomeIcon } from "../assets/icon/BottomNavIcon/homeActive.svg";

import { ReactComponent as RecipeIcon } from "../assets/icon/BottomNavIcon/recipe.svg";
import { ReactComponent as ActiveRecipeIcon } from "../assets/icon/BottomNavIcon/recipeActive.svg";

import { ReactComponent as PlusIcon } from "../assets/icon/BottomNavIcon/plus.svg";

import { ReactComponent as BoardIcon } from "../assets/icon/BottomNavIcon/board.svg";
import { ReactComponent as ActiveBoardIcon } from "../assets/icon/BottomNavIcon/boardActive.svg";

import { ReactComponent as MyIcon } from "../assets/icon/BottomNavIcon/my.svg";
import { ReactComponent as ActiveMyIcon } from "../assets/icon/BottomNavIcon/myActive.svg";

import { useLocation } from "react-router-dom";

const BottomNav = (props) => {
  const [isActive, setIsActive] = useState(false); // plus버튼 눌렀을떄 모달상태.
  const location = useLocation().pathname; // URL이 변경될떄마다 새로운 URL리턴.

  useEffect(() => {
    const DetectOutsideClick = () => {
      setIsActive(!isActive);
    };

    if (isActive) window.addEventListener("click", DetectOutsideClick);
    return () => {
      window.removeEventListener("click", DetectOutsideClick);
    };
  }, [isActive]);

  const ClickedModal = () => {
    setIsActive(!isActive);
  };

  return (
    <BottomNavInner>
      {isActive ? (
        <PlusModal>
          <ModalContentInner>
            <ModalContent>레시피 공유하기</ModalContent>
            <ModalContent>MD사진 올리기</ModalContent>
          </ModalContentInner>
        </PlusModal>
      ) : (
        ""
      )}

      <NavButtonInner>
        <NavButton
          onClick={() => {
            // history.push('/Home');
          }}
        >
          {location === "/" ? <ActiveHomeIcon /> : <HomeIcon />}
        </NavButton>

        <NavButton
          onClick={() => {
            // history.push('/Board');
          }}
        >
          {location === "/Board" ? <ActiveBoardIcon /> : <BoardIcon />}
        </NavButton>

        <NavButton onClick={ClickedModal}>
          <PlusIcon />
        </NavButton>

        <NavButton
          onClick={() => {
            // history.push('/My');
          }}
        >
          {location === "/My" ? <ActiveMyIcon /> : <MyIcon />}
        </NavButton>

        <NavButton
          onClick={() => {
            // history.push('/Recipe');
          }}
        >
          {location === "/Recipe" ? <ActiveRecipeIcon /> : <RecipeIcon />}
        </NavButton>
      </NavButtonInner>
    </BottomNavInner>
  );
};

const BottomNavInner = styled.div`
  background: #f8f8fa;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
`;

const PlusModal = styled.div`
  padding: 24px 0px;
  border-radius: 16px 16px 0px 0px;
  background: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContentInner = styled.div`
  height: 88px;
  margin: 10px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalContent = styled.p`
  padding: 12px;
`;

const NavButtonInner = styled.div`
  display: flex;
  justify-content: center;
`;

const NavButton = styled.button``;

export default BottomNav;
