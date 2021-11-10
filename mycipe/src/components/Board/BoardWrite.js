/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";
// icon
import { ReactComponent as BackIcon } from "../../assets/icon/HeaderIcon/back.svg";
// shared components
import ImageListUpload from "../../shared/ImageListUpload";
import HashTag from "../../shared/HashTag";
import ModalBackground from "../../shared/ModalBackground";
// async function
import { addRecipePostDB } from "../../redux/Async/recipeBoard";
import { addBulletinPostDB } from "../../redux/Async/bulletinBoard";
const BoardWrite = ({ boardName }) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState([]);
  const [tagList, setTagList] = useState([]);

  // fileList를 받아와서 setFile 해줍니다.
  const getFileFromImageList = (fileList) => {
    setFileList([...fileList]);
  };
  console.log(fileList);

  // tagList를 받아와서 setTag 해줍니다.
  const getTagFromHashTag = (tagList) => {
    setTagList(tagList);
  };

  const addPost = () => {
    // 레시피 폼데이터
    const recipeFormData = new FormData();
    recipeFormData.append("title", title);
    recipeFormData.append("content", content);
    recipeFormData.append("price", price);
    recipeFormData.append("tag", tagList);
    for (const f of fileList) {
      recipeFormData.append("image", f);
    }

    // 게시판 폼데이터
    const bulletinFormData = new FormData();
    bulletinFormData.append("title", title);
    bulletinFormData.append("content", content);
    for (const f of fileList) {
      bulletinFormData.append("image", f);
    }

    if (boardName === "recipeBoard") {
      dispatch(addRecipePostDB(recipeFormData));
    }
    if (boardName === "bulletinBoard") {
      dispatch(addBulletinPostDB(bulletinFormData));
    }
  };

  return (
    <>
      <HeaderInner flexBetween>
        <LeftInner>
          <BackIcon
            onClick={() => {
              history.goBack();
            }}
          />
          <PageName>
            {boardName === "recipeBoard"
              ? "레시피 작성하기"
              : "게시글 작성하기"}
          </PageName>
        </LeftInner>

        <Button
          onClick={() => {
            addPost();
          }}
        >
          완료
        </Button>
      </HeaderInner>
      <BoardWriteWrapper>
        {isActive && <ModalBackground />}
        <ImageListUpload getFileFromImageList={getFileFromImageList} />

        <TextInputBox
          onChange={(e) => setTitle(e.target.value)}
          height="48"
          marginBtm="8"
          placeholder={
            boardName === "recipeBoard" ? "레시피 이름" : "게시글 제목"
          }
        />

        {/* 레시피 작성시에만 렌더링 해줌 */}
        {boardName === "recipeBoard" ? (
          <TextInputBox
            onChange={(e) => setPrice(1 * e.target.value)}
            height="48"
            marginBtm="8"
            placeholder="가격"
          />
        ) : (
          ""
        )}

        <TextInputBox
          onChange={(e) => setContent(e.target.value)}
          height="240"
          marginBtm="16"
          placeholder={
            boardName === "recipeBoard"
              ? "레시피 설명을 입력해주세요"
              : "게시글 내용을 작성해주세요"
          }
        />

        {/* 레시피 작성시에만 렌더링 해줌 */}
        {boardName === "recipeBoard" && (
          <>
            <HashTagTitle>해시태그 선택</HashTagTitle>
            <HashTag getTagFromHashTag={getTagFromHashTag} />
          </>
        )}
      </BoardWriteWrapper>
    </>
  );
};

const BoardWriteWrapper = styled.div`
  padding: 20px 0px 20px;
  height: auto;
  min-height: calc(100% - 60px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const TextInputBox = styled.textarea`
  width: 320px;
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.marginBtm}px;
  padding: 14px 16px;
  background: #f8f8fa;
  border-radius: 6px;

  &::placeholder {
    color: #999999;
  }
`;

const HashTagTitle = styled.p`
  margin-bottom: 8px;
  position: relative;
  right: 30%;
  font-size: 14px;
  color: #999999;
`;

export default BoardWrite;
