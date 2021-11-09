import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import { ReactComponent as BackIcon } from "../assets/icon/HeaderIcon/back.svg";
import { ReactComponent as SearchIcon } from "../assets/icon/HeaderIcon/search.svg";
import { ReactComponent as SettingIcon } from "../assets/icon/HeaderIcon/setting.svg";
import { ReactComponent as LogoIcon } from "../assets/icon/HeaderIcon/logo.svg";

import { history } from "../redux/configureStore";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = (props) => {
  const location = useLocation().pathname;

  const LoginUserInfo = useSelector((state) => state.user);
  const loginUserNickname = LoginUserInfo.userInfo.nickname;
  if (!LoginUserInfo.isLogin) return null;

  if (
    location === "/" ||
    location === "/recipeboard/write" ||
    location === "/bulletinboard/write"
  ) {
    // 시작페이지
    return null;
  }

  if (location === "/signup") {
    // 회원가입페이지
    return (
      <HeaderInner>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
        />
        <PageName>회원가입</PageName>
      </HeaderInner>
    );
  }

  if (location === "/login") {
    // 로그인페이지
    return (
      <HeaderInner>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
        />
        <PageName>로그인</PageName>
      </HeaderInner>
    );
  }

  if (location === "/main") {
    //메인페이지
    return (
      <HeaderInner flexBetween>
        <LogoIcon
          onClick={() => {
            history.push("/main");
          }}
        />
        <SearchIcon />
      </HeaderInner>
    );
  }

  if (location.includes("/usermain")) {
    // 유저메인페이지 & 마이페이지
    if (location.includes(loginUserNickname)) {
      return (
        <HeaderInner flexBetween>
          <LeftInner>
            <BackIcon
              onClick={() => {
                history.goBack();
              }}
            />
            <PageName>마이페이지</PageName>
          </LeftInner>

          <SettingIcon
            onClick={() => {
              history.push("/setting");
            }}
          />
        </HeaderInner>
      );
    } else {
      return (
        <HeaderInner flexBetween>
          <BackIcon
            onClick={() => {
              history.goBack();
            }}
          />

          <SettingIcon
            onClick={() => {
              history.push("/setting");
            }}
          />
        </HeaderInner>
      );
    }
  }

  if (location === "/userpageprofileedit") {
    // 유저 프로필 수정페이지
    return (
      <HeaderInner>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
        />
        <PageName>프로필편집</PageName>
      </HeaderInner>
    );
  }

  if (location.includes("/userpagefollowlist")) {
    // 유저 팔로우 & 팔로잉 페이지
    return (
      <HeaderInner>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
        />
      </HeaderInner>
    );
  }

  if (location === "/recipeboard") {
    //레시피 메인
    return (
      <HeaderInner flexBetween>
        <PageName>레시피</PageName>
        <SearchIcon
          onClick={() => {
            history.push("/searchmain");
          }}
        />
      </HeaderInner>
    );
  }

  if (location.includes("/recipeboard/detail")) {
    //레시피 상세
    return (
      <HeaderInner>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
        />
        <PageName>레시피 보기</PageName>
      </HeaderInner>
    );
  }

  if (location === "/bulletinboard") {
    //자유게시판
    return (
      <HeaderInner flexBetween>
        <PageName>게시판</PageName>
        <SearchIcon
          onClick={() => {
            history.push("/Searchmain");
          }}
        />
      </HeaderInner>
    );
  }

  if (location.includes("/bulletinboard/detail")) {
    //자유게시판 상세
    return (
      <HeaderInner>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
        />
        <PageName>게시글 보기</PageName>
      </HeaderInner>
    );
  }

  if (location.includes("/searchmain")) {
    //검색메인
    return (
      <HeaderInner flexBetween>
        <LeftInner>
          <BackIcon
            onClick={() => {
              history.goback();
            }}
          />
        </LeftInner>

        <SearchInput placeholder="검색어를 입력해 주세요." />

        <SearchButton>검색</SearchButton>
      </HeaderInner>
    );
  }

  if (location === "/setting") {
    //설정페이지
    return (
      <HeaderInner>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
        />
        <PageName>설정페이지</PageName>
      </HeaderInner>
    );
  }
};

const HeaderInner = styled.div`
  width: 100%;
  height: 48px;
  z-index: 1;
  padding: 0px 20px;
  position: sticky;
  top: 0;

  background: #fff;
  display: flex;
  align-items: center;
  ${(props) =>
    props.flexBetween &&
    css`
      justify-content: space-between;
    `}
`;

const PageName = styled.span`
  font-size: 16px;
  margin-left: 8px;
`;

const LeftInner = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #7692e4;
  justify-content: center;
`;

const SearchButton = styled(Button)`
  width: 50px;
  height: 28px;
  background: #7692e4;
  border-radius: 6px;
  color: #fff;
`;

const SearchInput = styled.input`
  background-color: #f8f8fa;
  border-radius: 6px;
  width: 250px;
  height: 28px;
  padding: 14px;

  &::placeholder {
    color: #999999;
    font-size: 14px;
  }
`;

export default Header;
