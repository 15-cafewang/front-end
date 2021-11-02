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
  const [isActive, setIsActive] = useState(false);
  // const [currentUrl, setCurrentUrl] = useState("/");
  const location = useLocation(); // URL이 변경될떄마다 새로운 URL리턴.
  console.log(location);

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

      <NavButton
        onClick={() => {
          // setCurrentUrl('/Home');
          // history.push('/Home');
        }}
      >
        {location.pathname === "/" ? <ActiveHomeIcon /> : <HomeIcon />}
      </NavButton>

      <NavButton
        onClick={() => {
          // setCurrentUrl('/Board');
          // history.push('/Board');
        }}
      >
        {location.pathname === "/Board" ? <ActiveBoardIcon /> : <BoardIcon />}
      </NavButton>

      <NavButton onClick={ClickedModal}>
        <PlusIcon />
      </NavButton>

      <NavButton
        onClick={() => {
          // setCurrentUrl('/My');
          // history.push('/My');
        }}
      >
        {location.pathname === "/My" ? <ActiveMyIcon /> : <MyIcon />}
      </NavButton>

      <NavButton
        onClick={() => {
          // setCurrentUrl('/Recipe');
          // history.push('/Recipe');
        }}
      >
        {location.pathname === "/Recipe" ? (
          <ActiveRecipeIcon />
        ) : (
          <RecipeIcon />
        )}
      </NavButton>
    </BottomNavInner>
  );
};

const BottomNavInner = styled.div`
  width: 360px;
  height: 60px;
  background: #f8f8fa;
`;

// const NavButton = styled.button`
//   color: yellow;
// `;

const PlusModal = styled.div`
  height: 136px;
  padding: 24px 0px;
  border-radius: 16px 16px 0px 0px;

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

const NavButton = styled.button``;

export default BottomNav;
