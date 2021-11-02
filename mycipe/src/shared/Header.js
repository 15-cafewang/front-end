import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const pageName = "main";

  // 로그인,비밀번호재설정,회원가입
  return (
    <>
      <HeaderInner>
        <Button icon>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <PageName>{pageName}</PageName>
      </HeaderInner>

      <HeaderInner flexBetween>
        <Logo></Logo>
        <Button icon>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </HeaderInner>

      <HeaderInner flexBetween>
        <PageName>{pageName}</PageName>
        <Button icon>
          <FontAwesomeIcon icon={faCog} />
        </Button>
      </HeaderInner>

      <HeaderInner flexBetween>
        <LeftInner>
          <Button icon>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <PageName>{pageName}</PageName>
        </LeftInner>

        <Button>완료</Button>
      </HeaderInner>
    </>
  );

  //메인
  // return (
  //   <HeaderInner flexBetween>
  //     <Logo></Logo>
  //     <Button icon>
  //       <FontAwesomeIcon icon={faSearch} />
  //     </Button>
  //   </HeaderInner>
  // );

  //마이,게시판,
  // return (
  //   <HeaderInner flexBetween>
  //     <PageName>{pageName}</PageName>
  //     <Button icon>
  //       <FontAwesomeIcon icon={faCog} />
  //     </Button>
  //   </HeaderInner>
  // );

  //내시피 작성, 리뷰작성, 신메뉴이름
  // return (
  //   <HeaderInner flexBetween>
  //     <LeftInner>
  //       <Button icon>
  //         <FontAwesomeIcon icon={faArrowLeft} />
  //       </Button>
  //       <PageName>{pageName}</PageName>
  //     </LeftInner>

  //     <Button>완료</Button>
  //   </HeaderInner>
  // );
};

const HeaderInner = styled.div`
  height: 48px;
  width: 360px;
  padding: 14px 16px;
  background: yellow;
  ${(props) =>
    props.flexBetween &&
    css`
      display: flex;
      justify-content: space-between;
    `}// 메인페이지
`;

const PageName = styled.span`
  font-size: 16px;
  margin-left: 10px;
`;

// 메인페이지
const Logo = styled.img`
  background-image: url("https://static.hubzum.zumst.com/hubzum/2019/02/21/10/bedc4bd3d4b740e093d08ea5c1713b58.PNG");
  background-position: center;
  background-size: cover;

  width: 77px;
  height: 20px;
`;

const LeftInner = styled.div``;

const Button = styled.button`
  font-size: 16px;
  width: 30px;
  height: 20px;
  ${(props) =>
    props.icon &&
    css`
      width: 10px;
    `}
`;

export default Header;
