import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import { ReactComponent as BackIcon } from "../assets/icon/HeaderIcon/back.svg";
import { ReactComponent as SearchIcon } from "../assets/icon/HeaderIcon/search.svg";
import { ReactComponent as SettingIcon } from "../assets/icon/HeaderIcon/setting.svg";
import { ReactComponent as LogoIcon } from "../assets/icon/HeaderIcon/logo.svg";

import { history } from "../redux/configureStore";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { whereFrom, resetList } from "./../redux/Modules/searchSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const LoginUserInfo = useSelector((state) => state.user);

  const loginUserNickname = LoginUserInfo.userInfo.nickname;

  if (location === "/main") {
    //메인페이지
    return (
      <HeaderInner flexBetween>
        <LogoIcon />
      </HeaderInner>
    );
  }

  if (location.includes("/usermain")) {
    // 유저메인페이지 & 마이페이지
    if (location.includes(loginUserNickname)) {
      return (
        <HeaderInner flexBetween>
          <LeftInner>
            <IconInner height="16px">
              <BackIcon
                onClick={() => {
                  history.goBack();
                }}
              />
            </IconInner>
            <PageName margin="0px 0px 0px 12px">마이페이지</PageName>
          </LeftInner>

          <IconInner height="24px">
            <SettingIcon
              onClick={() => {
                history.push("/setting");
              }}
            />
          </IconInner>
        </HeaderInner>
      );
    } else {
      return (
        <HeaderInner flexBetween>
          <IconInner height="16px">
            <BackIcon
              onClick={() => {
                history.goBack();
              }}
            />
          </IconInner>

          <IconInner height="24px">
            <SettingIcon
              onClick={() => {
                history.push("/setting");
              }}
            />
          </IconInner>
        </HeaderInner>
      );
    }
  }

  if (location === "/userpageprofileedit") {
    // 유저 프로필 수정페이지
    return (
      <HeaderInner>
        <IconInner height="16px">
          <BackIcon
            onClick={() => {
              history.goBack();
            }}
          />
        </IconInner>
        <PageName margin="0px 0px 0px 12px">프로필편집</PageName>
      </HeaderInner>
    );
  }

  if (location.includes("/userpagefollowlist")) {
    // 유저 팔로우 & 팔로잉 페이지
    return (
      <HeaderInner>
        <IconInner height="16px">
          <BackIcon
            onClick={() => {
              history.goBack();
            }}
          />
        </IconInner>
      </HeaderInner>
    );
  }

  if (location === "/cafeboard") {
    //카페 후기 메인
    return (
      <HeaderInner flexBetween>
        <PageName>카페 후기</PageName>
        <SearchBox
          placeholder="카페후기 검색하기"
          onClick={() => {
            history.push("/searchmain");
            dispatch(resetList());
            dispatch(whereFrom("cafe"));
          }}
        />
        <IconInner height="24px">
          <SearchIcon
            onClick={() => {
              history.push("/searchmain");
              dispatch(resetList());
              dispatch(whereFrom("cafe"));
            }}
          />
        </IconInner>
      </HeaderInner>
    );
  }

  if (location.includes("/cafeboard/detail")) {
    //카페 후기 상세
    return (
      <HeaderInner>
        <IconInner height="16px">
          <BackIcon
            onClick={() => {
              history.goBack();
            }}
          />
        </IconInner>
        <PageName margin="0px 0px 0px 12px">카페 후기 보기</PageName>
      </HeaderInner>
    );
  }

  if (location === "/bulletinboard") {
    //자유게시판
    return (
      <HeaderInner flexBetween>
        <PageName>게시판</PageName>
        <SearchBox
          placeholder="게시물 검색하기"
          onClick={() => {
            history.push("/searchmain");
            dispatch(resetList());
            dispatch(whereFrom("cafe"));
          }}
        />
        <IconInner height="24px">
          <SearchIcon
            onClick={() => {
              history.push("/Searchmain");
              dispatch(resetList());
              dispatch(whereFrom("Board"));
            }}
          />
        </IconInner>
      </HeaderInner>
    );
  }

  if (location.includes("/bulletinboard/detail")) {
    //자유게시판 상세
    return (
      <HeaderInner>
        <IconInner height="16px">
          <BackIcon
            onClick={() => {
              history.goBack();
            }}
          />
        </IconInner>
        <PageName margin="0px 0px 0px 12px">게시글 보기</PageName>
      </HeaderInner>
    );
  }

  if (location === "/setting") {
    //설정페이지
    return (
      <HeaderInner>
        <IconInner height="16px">
          <BackIcon
            onClick={() => {
              history.goBack();
            }}
          />
        </IconInner>
        <PageName margin="0px 0px 0px 12px">설정페이지</PageName>
      </HeaderInner>
    );
  } else return null;
};

const HeaderInner = styled.div`
  width: 375px;
  height: 48px;
  padding: 0px 20px;
  z-index: 10;
  position: fixed;
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
  margin: ${(props) => props.margin};
  height: 16px;
  line-height: 20px;
`;

const LeftInner = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBox = styled.input`
  background-color: #f8f8fa;
  width: 200px;
  height: 28px;
  padding: 14px;

  &::placeholder {
    color: #999999;
    font-size: 14px;
  }
`;

const IconInner = styled.button`
  height: ${(props) => props.height};
`;

export default Header;
