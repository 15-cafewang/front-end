import React from "react";
import styled from "styled-components";

const ProfileImage = ({ size, src }) => {
  const styles = { size: size, src: src };

  return (
    <>
      <ImageCircle {...styles}></ImageCircle>
    </>
  );
};

ProfileImage.defaultProps = {
  size: "",
  src: "",
};

const ImageCircle = styled.div`
  // 레시피 페이지, 게시판 페이지
  ${(props) =>
    props.size === "small"
      ? `width : 38px; height : 38px; border-radius : 38px;`
      : ""}

  // 유저 페이지, 팔로잉(팔로우)목록 페이지
  ${(props) =>
    props.size === "medium"
      ? `width : 56px; height : 56px; border-radius : 56px;`
      : ""}
      
  // 프로필 편집 페이지
  ${(props) =>
    props.size === "large"
      ? `width : 80px; height : 80px; border-radius : 80px;`
      : ""}
  background-image: ${(props) => (props.src ? `url(${props.src})` : "")};
  background-size: cover;
  background-color: #ededed;
`;

export default ProfileImage;
