import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// shard components
import ImageListUpload from "../../shared/ImageListUpload";
import HashTag from "../../shared/HashTag";
import ModalBackground from "../../shared/ModalBackground";

const BoardWrite = ({ boardName }) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const [post, setPost] = useState({ title: "", price: "", content: "" });

  const addPost = (post) => {
    dispatch();
  };

  return (
    <>
      <BoardWriteWrapper>
        {isActive && <ModalBackground />}
        <ImageListUpload />

        <TextInputBox
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          height="48"
          marginBtm="8"
          placeholder={
            boardName === "recipeBoard" ? "레시피 이름" : "게시글 제목"
          }
        />

        {/* 레시피 작성시에만 렌더링 해줌 */}
        {boardName === "recipeBoard" ? (
          <TextInputBox
            onChange={(e) => setPost({ ...post, price: e.target.value })}
            height="48"
            marginBtm="8"
            placeholder="가격"
          />
        ) : (
          ""
        )}

        <TextInputBox
          onChange={(e) => setPost({ ...post, content: e.target.value })}
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
            <HashTag />
          </>
        )}

        <button
          onClick={() => {
            // console.log(post);
            addPost(post);
          }}
        >
          완료
        </button>
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
