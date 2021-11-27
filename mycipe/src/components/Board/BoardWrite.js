/* eslint-disable array-callback-return */
import React, { useEffect, useState, useRef } from "react";
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
import PopUp from "../../shared/PopUp";

// async function
import { addCafePostDB, editCafePostDB } from "../../redux/Async/cafeBoard";

import {
  addBulletinPostDB,
  editBulletinPostDB,
} from "../../redux/Async/bulletinBoard";

// api
import { getPostDetail } from "../../shared/api/cafeBoardApi";
import { bulletinBoardApi } from "../../shared/api/bulletinBoardApi";

const BoardWrite = ({ boardName }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isActive = useSelector((state) => state.modal.isActive);
  const isEdit = params.id ? true : false;

  // 입력 값 state
  const [post, setPost] = useState(null);

  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const contentRef = useRef(null);

  const currentPost = useSelector((state) =>
    boardName === "cafeBoard"
      ? state.cafeBoard.currentcafePost
      : state.bulletinBoard.currentBoardPost
  );

  // textarea 높이 자동 resize
  const handleResizeInputHeight = (height, ref) => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = height;
    ref.current.style.height = ref.current.scrollHeight + "px";
  };
  useEffect(() => {
    // 수정모드인데 리덕스에 현재 게시물 정보가 남아있다.
    if (isEdit && currentPost) {
      setPost(currentPost);
      return;
    }

    // 수정모드인데 현재 게시물에 대한 정보가 없을 때 (리덕스 초기화 되었을 때)
    if (isEdit && !currentPost) {
      if (boardName === "cafeBoard") {
        getPostDetail(params.id).then((res) => {
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
      alertPopUp("사진은 최대 5장까지 업로드 가능합니다🥲", 1200);
      return;
    }

    // 수정모드
    if (isEdit) {
      if (boardName === "cafeBoard") {
        if (!post.title || !post.content || !post.location) {
          alertPopUp("모든 항목을 작성해 주세요!", 1200);
          return;
        }
        const cafeFormData = new FormData();
        cafeFormData.append("title", post.title);
        cafeFormData.append("content", post.content);
        cafeFormData.append("location", post.location);
        cafeFormData.append("tag", post.tags);

        // 삭제한 이미지가 있을 때
        if (post.deleteImage) {
          for (const d of post.deleteImage) {
            cafeFormData.append("deleteImage", d);
          }
          if (
            post.images.length === post.deleteImage.length &&
            post.fileList.length === 0
          ) {
            alertPopUp("카페 사진은 최소 1장 첨부 부탁드립니다 🙏", 1200);

            return;
          }
        }

        // 추가한 이미지가 있을 때
        if (post.fileList) {
          for (const f of post.fileList) {
            cafeFormData.append("image", f);
          }
        }

        dispatch(editCafePostDB({ boardId: params.id, formData: cafeFormData }))
          .unwrap()
          .then((message) => {
            alertPopUp(message, 700, "/cafeBoard");
          })
          .catch((error) => {
            alertPopUp(error.data.message);
          });
      }

      if (boardName === "bulletinBoard") {
        if (!post.title && !post.content) {
          alertPopUp(" 제목과 내용을 작성해 주세요!", 1200);
          return;
        }

        if (!post.title) {
          alertPopUp(" 제목을 작성해 주세요!", 1200);
          return;
        }

        if (!post.content) {
          alertPopUp(" 내용을 작성해 주세요!", 1200);
          return;
        }

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
        )
          .unwrap()
          .then((message) => {
            alertPopUp(message, 700, "/bulletinBoard");
          })
          .catch((error) => {
            alertPopUp(error.data.message);
          });
      }
    }

    // 작성모드
    if (!isEdit) {
      if (boardName === "cafeBoard") {
        if (!post.title || !post.content || !post.location) {
          alertPopUp("모든 항목을 작성해 주세요!", 1200);
          return;
        }
        const cafeFormData = new FormData();
        cafeFormData.append("title", post.title);
        cafeFormData.append("content", post.content);
        cafeFormData.append("location", post.location);
        cafeFormData.append("tag", post.tags);
        if (!post.fileList) {
          alertPopUp("카페 사진은 최소 1장 첨부 부탁드립니다 🙏", 1200);
          return;
        }
        for (const f of post.fileList) {
          cafeFormData.append("image", f);
        }

        dispatch(addCafePostDB(cafeFormData))
          .unwrap()
          .then((messgae) => {
            alertPopUp(messgae, 700, "/cafeBoard");
          })
          .catch((error) => {
            alertPopUp(error.data.message);
          });
      }

      if (boardName === "bulletinBoard") {
        if (!post.title && !post.content) {
          alertPopUp(" 제목과 내용을 작성해 주세요!", 1200);
          return;
        }

        if (!post.title) {
          alertPopUp(" 제목을 작성해 주세요!", 1200);
          return;
        }

        if (!post.content) {
          alertPopUp(" 내용을 작성해 주세요!", 1200);
          return;
        }

        const bulletinFormData = new FormData();
        bulletinFormData.append("title", post.title);
        bulletinFormData.append("content", post.content);

        for (const f of post.fileList) {
          bulletinFormData.append("image", f);
        }

        dispatch(addBulletinPostDB(bulletinFormData))
          .unwrap()
          .then((messgae) => {
            alertPopUp(messgae, 700, "/bulletinBoard");
          })
          .catch((error) => {
            alertPopUp(error.data.message);
          });
      }
    }
  };

  // alert 창
  const [popUp, setPopUp] = useState(false);
  const [message, setMessage] = useState("");

  // alert 제어 함수 ( 반복되는 코드를 줄이기위해)
  const alertPopUp = (message, delay = 700, url = "") => {
    setPopUp(true);
    setMessage(message);

    setTimeout(() => {
      setPopUp(false);
      url && history.push(url);
    }, delay);
  };

  return (
    <>
      <PopUp
        popUp={popUp}
        setPopUp={setPopUp}
        message={message}
        _onClick={() => {}}
      />

      <HeaderInner flexBetween>
        <LeftInner>
          <BackIcon
            onClick={() => {
              history.goBack();
            }}
          />
          <PageName>
            {isEdit
              ? boardName === "cafeBoard"
                ? "카페 후기 수정하기"
                : "게시글 수정하기"
              : boardName === "cafeBoard"
              ? "카페 공유하기"
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
          ref={titleRef}
          onIput={handleResizeInputHeight("48px", titleRef)}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          borderNone
          height="48"
          placeholder={boardName === "cafeBoard" ? "카페 이름" : "게시글 제목"}
          value={post ? post.title : ""}
        />

        {/* 카페 후기 작성시에만 렌더링 해줌 */}
        {boardName === "cafeBoard" ? (
          <TextInputBox
            ref={locationRef}
            onIput={handleResizeInputHeight("48px", locationRef)}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            borderNone
            height="48"
            placeholder="카페 위치 (ex. 홍대 어딘가)"
            value={post ? post.location : ""}
          />
        ) : (
          ""
        )}

        <TextInputBox
          ref={contentRef}
          onIput={handleResizeInputHeight("240px", contentRef)}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          height="240"
          marginBtm="24"
          placeholder={
            boardName === "cafeBoard"
              ? "카페 설명을 입력해주세요."
              : "게시글 내용을 작성해주세요."
          }
          value={post ? post.content : ""}
        />

        {/* 카페 후기 작성시에만 렌더링 해줌 */}
        {boardName === "cafeBoard" && (
          <Grid>
            <HashTagTitle>해시태그 선택</HashTagTitle>
            <Grid isflex>
              {isEdit && post && (
                <HashTag tags={post.tags} post={post} setPost={setPost} />
              )}
              {!isEdit && <HashTag post={post} setPost={setPost} />}
            </Grid>
          </Grid>
        )}
      </BoardWriteWrapper>
    </>
  );
};

const Grid = styled.div`
  ${(props) =>
    props.isflex &&
    css`
      display: flex;
      justify-content: center;
    `}
`;

const BoardWriteWrapper = styled.div`
  padding: 20px 20px 20px;

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
  color: #000000;
  justify-content: center;
`;

const TextInputBox = styled.textarea`
  width: 100%;
  height: ${(props) => props.height}px;
  padding: 14px 16px;
  border: 1px solid #999999;
  margin-bottom: ${(props) => props.marginBtm}px;
  ${(props) => props.borderNone && `border-bottom : none;`}

  resize: none;
  overflow: hidden;

  white-space: pre-wrap;
  word-break: break-all;

  &::placeholder {
    color: #999999;
  }
`;

const HashTagTitle = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  color: #999999;
`;

export default BoardWrite;
