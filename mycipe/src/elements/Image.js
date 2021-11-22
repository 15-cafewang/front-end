import React from "react";
import styled from "styled-components";

const Image = ({ size, shape, src, slide, children, _onClick }) => {
  const styles = { size: size, shape: shape, src: src };

  if (shape === "circle") {
    return (
      <>
        <ImageCircle {...styles} onClick={_onClick} />
      </>
    );
  }

  if (shape === "rectangle") {
    return (
      <Outter size={styles.size}>
        <ImageRectångle size={styles.size} src={styles.src}>
          {children}
        </ImageRectångle>
      </Outter>
    );
  }
};

Image.defaultProps = {
  size: "",
  shape: "",
  src: "",
  _onClick: () => {},
};

const ImageCircle = styled.div`
  // 레시피 페이지, 게시판 페이지
  ${(props) =>
    props.size === "small" &&
    `width : 38px; height : 38px; border-radius : 38px;`}

  // 유저 페이지, 팔로잉(팔로우)목록 페이지
  ${(props) =>
    props.size === "medium" &&
    `width : 56px; height : 56px; border-radius : 56px;`}
      
  // 프로필 편집 페이지
  ${(props) =>
    props.size === "large" &&
    `width : 80px; height : 80px; border-radius : 80px;`}
    
  background-image: ${(props) => (props.src ? `url(${props.src})` : "")};
  background-size: cover;
  background-color: #ededed;
  cursor: pointer;
`;

const Outter = styled.div`
  // 게시판 작성페이지
  ${(props) =>
    props.size === "small" &&
    `width : 100px; height : 100px; border-radius : 6px; flex: 0 0 auto; margin : 0px 16px 16px 0px;`}

  // 메인 페이지, 마이(유저) 페이지, 검색 페이지
    ${(props) =>
    props.size === "medium" &&
    `width : 112px; height : 112px; border-radius : 6px 0px 0px 6px;`}
    
  // 게사판 메인 페이지
  ${(props) =>
    props.size === "medium2" &&
    `width : 100px; height : 80px; border-radius : 6px;`}

  // 레시피 작성 페이지
  ${(props) =>
    props.size === "large" &&
    `width : 320px; height : 320px; border-radius : 6px; margin-bottom : 16px;`}
`;

const ImageRectångle = styled.div`
  // 게시판 작성페이지
  ${(props) => props.size === "small" && `border-radius : 6px;`}

  // 메인 페이지, 마이(유저) 페이지, 검색 페이지
    ${(props) => props.size === "medium" && `border-radius : 6px 0px 0px 6px;`}
    
  // 게사판 메인 페이지
  ${(props) => props.size === "medium2" && `border-radius : 6px;`}

  // 레시피 작성 페이지
  ${(props) => props.size === "large" && `border-radius : 6px;`}

  width: 100%;
  height: 100%;
  background-color: #ededed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${(props) => (props.src ? `background-image : url(${props.src})` : "")};
`;

export default Image;
