/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { history } from "../../redux/configureStore";
// icon
import { ReactComponent as BackIcon } from "../../assets/icon/HeaderIcon/back.svg";
// shared components
import ImageListUpload from "../../shared/ImageListUpload";
import HashTag from "../../shared/HashTag";
import ModalBackground from "../../shared/ModalBackground";
// async function
import {
  addRecipePostDB,
  editRecipePostDB,
} from "../../redux/Async/recipeBoard";
import {
  addBulletinPostDB,
  editBulletinPostDB,
} from "../../redux/Async/bulletinBoard";
// api
import { recipeBoardApi } from "../../shared/api/recipeBoardApi";
import { bulletinBoardApi } from "../../shared/api/bulletinBoardApi";

const BoardWrite = ({ boardName }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isActive = useSelector((state) => state.modal.isActive);
  const isEdit = params.id ? true : false;

  // 입력 값 state
  const [post, setPost] = useState(null);

  const currentPost = useSelector((state) =>
    boardName === "recipeBoard"
      ? state.recipeBoard.currentRecipePost
      : state.bulletinBoard.currentBoardPost
  );

  console.log(post);
  useEffect(() => {
    if (isEdit && currentPost) {
      setPost(currentPost);
      return;
    }

    // 수정모드인데 현재 게시물에 대한 정보가 없을 때 (리덕스 초기화 되었을 때)
    if (isEdit && !currentPost) {
      console.log(boardName);
      if (boardName === "recipeBoard") {
        console.log("aa");
        recipeBoardApi.getPostDetail(params.id).then((res) => {
          setPost(res.data.data);
        });
      }
      if (boardName === "bulletinBoard") {
        console.log("aa");
        bulletinBoardApi.getPostDetail(params.id).then((res) => {
          setPost(res.data.data);
        });
      }
    }
  }, [boardName, currentPost, isEdit, params.id]);

  const addPost = () => {
    // 수정모드
    if (isEdit) {
      if (boardName === "recipeBoard") {
        const recipeFormData1 = new FormData();
        recipeFormData1.append("title", post.title);
        recipeFormData1.append("content", post.content);
        recipeFormData1.append("price", post.price);
        recipeFormData1.append("tag", post.tags);
        if (post.fileList) {
          for (const f of post.fileList) {
            recipeFormData1.append("image", f);
          }
        } else {
          recipeFormData1.append("image", []);
        }
        console.log(post.title);
        console.log(post.content);
        console.log(post.price);
        console.log(post.tags);
        console.log(post.fileList);
        dispatch(
          editRecipePostDB({ boardId: params.id, formData: recipeFormData1 })
        );
      }

      if (boardName === "bulletinBoard") {
        const bulletinFormData = new FormData();
        bulletinFormData.append("title", post.title);
        bulletinFormData.append("content", post.content);
        for (const f of post.fileList) {
          bulletinFormData.append("image", f);
        }
        console.log(post.fileList);
        console.log(post.title);
        console.log(post.content);
        dispatch(
          editBulletinPostDB({ boardId: params.id, formData: bulletinFormData })
        );
      }
    }

    // 작성모드
    if (!isEdit) {
      if (boardName === "recipeBoard") {
        const recipeFormData = new FormData();
        recipeFormData.append("title", post.title);
        recipeFormData.append("content", post.content);
        recipeFormData.append("price", post.price);
        recipeFormData.append("tag", post.tags);
        if (post.fileList) {
          for (const f of post.fileList) {
            recipeFormData.append("image", f);
          }
        }
        console.log(post.tagList);
        dispatch(addRecipePostDB(recipeFormData));
      }

      if (boardName === "bulletinBoard") {
        const bulletinFormData = new FormData();
        bulletinFormData.append("title", post.title);
        bulletinFormData.append("content", post.content);
        for (const f of post.fileList) {
          bulletinFormData.append("image", f);
        }
        dispatch(addBulletinPostDB(bulletinFormData));
      }
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
            {isEdit
              ? boardName === "recipeBoard"
                ? "레시피 수정하기"
                : "게시글 수정하기"
              : boardName === "recipeBoard"
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
        {isEdit && post && (
          <ImageListUpload images={post.images} post={post} setPost={setPost} />
        )}
        {!isEdit && <ImageListUpload post={post} setPost={setPost} />}

        <TextInputBox
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          height="48"
          marginBtm="8"
          placeholder={
            boardName === "recipeBoard" ? "레시피 이름" : "게시글 제목"
          }
          value={post ? post.title : ""}
        />

        {/* 레시피 작성시에만 렌더링 해줌 */}
        {boardName === "recipeBoard" ? (
          <TextInputBox
            onChange={(e) => setPost({ ...post, price: 1 * e.target.value })}
            height="48"
            marginBtm="8"
            placeholder="가격"
            value={post ? post.price : ""}
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
          value={post ? post.content : ""}
        />

        {/* 레시피 작성시에만 렌더링 해줌 */}
        {boardName === "recipeBoard" && (
          <>
            <HashTagTitle>해시태그 선택</HashTagTitle>
            {isEdit && post && (
              <HashTag tags={post.tags} post={post} setPost={setPost} />
            )}
            {!isEdit && <HashTag post={post} setPost={setPost} />}
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
