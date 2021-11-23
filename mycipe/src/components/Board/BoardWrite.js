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
    // 수정모드인데 리덕스에 현재 게시물 정보가 남아있다.
    if (isEdit && currentPost) {
      setPost(currentPost);
      return;
    }

    // 수정모드인데 현재 게시물에 대한 정보가 없을 때 (리덕스 초기화 되었을 때)
    if (isEdit && !currentPost) {
      if (boardName === "recipeBoard") {
        recipeBoardApi.getPostDetail(params.id).then((res) => {
          setPost(res.data.data);
        });
      }
      if (boardName === "bulletinBoard") {
        bulletinBoardApi.getPostDetail(params.id).then((res) => {
          setPost(res.data.data);
        });
      }
    }
  }, [boardName, currentPost, isEdit, params.id]);

  const addPost = () => {
    if (post && post.previewURLList && post.previewURLList.length >= 6) {
      window.alert("사진은 최대 5장까지 업로드 가능합니다🥲");
      return;
    }

    // 수정모드
    if (isEdit) {
      if (boardName === "recipeBoard") {
        const recipeFormData = new FormData();
        recipeFormData.append("title", post.title);
        recipeFormData.append("content", post.content);
        recipeFormData.append("location", post.location);
        recipeFormData.append("tag", post.tags);

        // 삭제한 이미지가 있을 때
        if (post.deleteImage) {
          for (const d of post.deleteImage) {
            recipeFormData.append("deleteImage", d);
          }
          if (
            post.images.length === post.deleteImage.length &&
            post.fileList.length === 0
          ) {
            window.alert("카페 사진은 최소 1장 첨부 부탁드립니다 🙏");
            return;
          }
        }

        // 추가한 이미지가 있을 때
        if (post.fileList) {
          for (const f of post.fileList) {
            recipeFormData.append("image", f);
          }
        }
        dispatch(
          editRecipePostDB({ boardId: params.id, formData: recipeFormData })
        );
      }

      if (boardName === "bulletinBoard") {
        const bulletinFormData = new FormData();
        bulletinFormData.append("title", post.title);
        bulletinFormData.append("content", post.content);
        if (post.fileList) {
          for (const f of post.fileList) {
            bulletinFormData.append("image", f);
          }
        }
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
        recipeFormData.append("location", post.location);
        recipeFormData.append("tag", post.tags);

        if (!post.fileList) {
          window.alert("카페 사진은 최소 1장 첨부 부탁드립니다 🙏");
          return;
        }

        for (const f of post.fileList) {
          recipeFormData.append("image", f);
        }

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
          <ImageListUpload
            isEdit={isEdit}
            images={post.images}
            post={post}
            setPost={setPost}
          />
        )}
        {!isEdit && <ImageListUpload post={post} setPost={setPost} />}

        <TextInputBox
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          height="48"
          marginBtm="8"
          placeholder={
            boardName === "recipeBoard" ? "카페 이름" : "게시글 제목"
          }
          value={post ? post.title : ""}
        />

        {/* 레시피 작성시에만 렌더링 해줌 */}
        {boardName === "recipeBoard" ? (
          <TextInputBox
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            height="48"
            marginBtm="8"
            placeholder="카페 위치 (ex. 홍대 어딘가)"
            value={post ? post.location : ""}
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
              ? "카페 설명을 입력해주세요."
              : "게시글 내용을 작성해주세요."
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
  right: 33%;
  font-size: 14px;
  color: #999999;
`;

export default BoardWrite;
