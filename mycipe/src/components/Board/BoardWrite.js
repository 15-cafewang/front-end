import React from "react";
import styled from "styled-components";

// shard components
import ImageUpload from "../../shared/ImageUpload";
import HashTag from "../../shared/HashTag";

const BoardWrite = ({ boardName }) => {
  return (
    <>
      <BoardWriteWrapper>
        <ImageUpload />

        <TextInputBox
          height="48"
          marginBtm="8"
          placeholder={
            boardName === "recipeBoard" ? "레시피 이름" : "게시글 제목"
          }
        />

        {/* ------------------------ */}
        {/* 레시피 작성시에만 렌더링 해줌 */}
        {boardName === "recipeBoard" ? (
          <TextInputBox height="48" marginBtm="8" placeholder="가격" />
        ) : (
          ""
        )}
        {/* ------------------------ */}

        <TextInputBox
          height="240"
          marginBtm="16"
          placeholder={
            boardName === "recipeBoard"
              ? "레시피 설명을 입력해주세요"
              : "게시글 내용을 작성해주세요"
          }
        />

        {/* ------------------------ */}
        {/* 레시피 작성시에만 렌더링 해줌 */}
        {boardName === "recipeBoard" && (
          <>
            <HashTagTitle>해시태그 선택</HashTagTitle>
            <HashTag />
            {/* ------------------------ */}
          </>
        )}
      </BoardWriteWrapper>
    </>
  );
};

const BoardWriteWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextInputBox = styled.textarea`
  width: 320px;
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.marginBtm}px;
  padding: 14px 16px;
  background: #f8f8fa;
  border-radius: 6px;
`;

const HashTagTitle = styled.p`
  margin-bottom: 8px;
  position: relative;
  right: 35%;
  font-size: 14px;
  color: #999999;
`;

export default BoardWrite;
