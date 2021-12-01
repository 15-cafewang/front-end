import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { history } from "../../redux/configureStore";
// icon
import { ReactComponent as BackIcon } from "../../assets/icon/HeaderIcon/back.svg";
import { ReactComponent as DropDownIcon } from "../../assets/icon/dropdownIcon.svg";
// shared components
import ImageListUpload from "../../shared/ImageListUpload";
import HashTag from "../../shared/HashTag";
import ModalBackground from "../../shared/ModalBackground";
import PopUp from "../../shared/PopUp";

// async function
import { addCafePostDB, editCafePostDB } from "../../redux/Async/cafeBoard";

// action
import { setIsCafeLoading } from "../../redux/Modules/cafeBoardSlice";
import { setIsBoardLoading } from "../../redux/Modules/bulletinBoardSlice";

import {
  addBulletinPostDB,
  editBulletinPostDB,
} from "../../redux/Async/bulletinBoard";

// api
import { getCafeDetail } from "../../shared/api/cafeBoardApi";
import { getPostDetail } from "../../shared/api/bulletinBoardApi";

const regionList = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "경남",
  "경북",
  "전남",
  "전북",
  "충남",
  "충북",
  "제주",
];

const BoardWrite = ({ boardName }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEdit = params.id ? true : false;

  const isBoardLoading = useSelector((state) => state.bulletinBoard.isLoading);
  const isCafeLoading = useSelector((state) => state.cafeBoard.isLoading);

  const isActive = useSelector((state) => state.modal.isActive);

  // 입력 값 state
  const [post, setPost] = useState(null);

  // 드롭다운 state
  const [isDown, setIsDown] = useState(false);
  const [region, setRegion] = useState(null);

  // 텍스트 길이 state
  const [titleLength, setTitleLength] = useState(0);
  const [locationLength, setLocationLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);

  const titleRef = useRef(null);
  const detailLocationRef = useRef(null);
  const contentBoxRef = useRef(null);
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

  // 글자수 제한 함수
  const checkTextLength = (e, maxLength, setLength) => {
    let targetText = e.target.value;
    let textLength = e.target.value.length;

    if (textLength <= maxLength) setLength(e.target.value.length);
    else {
      e.target.value = targetText.substr(0, maxLength);
      setLength(maxLength);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });

    return () => {
      dispatch(setIsCafeLoading());
      dispatch(setIsBoardLoading());
    };
  }, []);

  useEffect(() => {
    if (!isEdit && (isCafeLoading || isBoardLoading))
      alertPopUp("작성중입니다 😉", 1000);
    if (isEdit && (isCafeLoading || isBoardLoading))
      alertPopUp("수정중입니다 😉", 1000);
  }, [isCafeLoading, isBoardLoading]);

  useEffect(() => {
    const DetectOutsideClick = () => {
      setIsDown(!isDown);
    };

    if (isDown) {
      window.addEventListener("click", DetectOutsideClick);
    }

    return () => {
      window.removeEventListener("click", DetectOutsideClick);
    };
  }, [isDown]);

  useEffect(() => {
    // 수정모드인데 리덕스에 현재 게시물 정보가 남아있다.
    if (isEdit && currentPost) {
      setPost(currentPost);
      return;
    }

    // 수정모드인데 현재 게시물에 대한 정보가 없을 때 (리덕스 초기화 되었을 때)
    if (isEdit && !currentPost) {
      if (boardName === "cafeBoard") {
        getCafeDetail(params.id).then((res) => {
          setPost(res.data.data);
        });
      }
      if (boardName === "bulletinBoard") {
        getPostDetail(params.id).then((res) => {
          setPost(res.data.data);
        });
      }
    }
  }, [boardName, currentPost, isEdit, params.id]);

  useEffect(() => {
    if (isEdit && post) {
      setTitleLength(titleRef.current.value.length);
      setContentLength(contentRef.current.value.length);

      if (boardName === "cafeBoard") setLocationLength(post.location.length);
    }
  }, [isEdit, post, boardName]);

  // 수정모드에 처음 들어왔을 때 region을 설정해준다.
  useEffect(() => {
    if (boardName === "cafeBoard") {
      if (isEdit && post) {
        if (!isDown && !region) setRegion(post.location.split(" ")[0]);
      }
    }
  }, [isDown, region, post, isEdit, boardName]);

  const addPost = () => {
    if (post && post.previewURLList && post.previewURLList.length >= 6) {
      alertPopUp("사진은 최대 5장까지 업로드 가능합니다🥲", 1200);
      return;
    }

    // 수정모드
    if (isEdit) {
      if (boardName === "cafeBoard") {
        if (
          !titleRef.current.value ||
          !contentRef.current.value ||
          !region ||
          !detailLocationRef.current.value ||
          post.tags.length === 0
        ) {
          alertPopUp("모든 항목을 작성해 주세요!", 1200);
          return;
        }

        const cafeFormData = new FormData();
        cafeFormData.append("title", titleRef.current.value);
        cafeFormData.append("content", contentRef.current.value);
        cafeFormData.append(
          "location",
          `${region} ${detailLocationRef.current.value}`
        );
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
            alertPopUp(message, 700, true);
          })
          .catch((error) => {
            alertPopUp(error.data.message);
          });
      }

      if (boardName === "bulletinBoard") {
        if (!titleRef.current.value && !contentRef.current.value) {
          alertPopUp(" 제목과 내용을 작성해 주세요!", 1200);
          return;
        }

        if (!titleRef.current.value) {
          alertPopUp(" 제목을 작성해 주세요!", 1200);
          return;
        }

        if (!contentRef.current.value) {
          alertPopUp(" 내용을 작성해 주세요!", 1200);
          return;
        }

        const bulletinFormData = new FormData();

        bulletinFormData.append("title", titleRef.current.value);
        bulletinFormData.append("content", contentRef.current.value);

        if (post.fileList) {
          for (const f of post.fileList) {
            bulletinFormData.append("image", f);
          }
        }

        if (post.deleteImage) {
          for (const d of post.deleteImage) {
            bulletinFormData.append("deleteImage", d);
          }
        }

        dispatch(
          editBulletinPostDB({ boardId: params.id, formData: bulletinFormData })
        )
          .unwrap()
          .then((message) => {
            alertPopUp(message, 700, true);
          })
          .catch((error) => {
            alertPopUp(error.data.message);
          });
      }
    }

    // 작성모드
    if (!isEdit) {
      if (boardName === "cafeBoard") {
        if (
          !titleRef.current.value ||
          !contentRef.current.value ||
          !region ||
          !detailLocationRef.current.value ||
          !post.tags.length === 0
        ) {
          alertPopUp("모든 항목을 작성해 주세요!", 1200);
          return;
        }

        const cafeFormData = new FormData();

        cafeFormData.append("title", titleRef.current.value);
        cafeFormData.append("content", contentRef.current.value);
        cafeFormData.append(
          "location",
          `${region} ${detailLocationRef.current.value}`
        );
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
            alertPopUp(messgae, 700, false, "/cafeBoard");
          })
          .catch((error) => {
            alertPopUp(error.data.message);
          });
      }

      if (boardName === "bulletinBoard") {
        if (!titleRef.current.value && !contentRef.current.value) {
          alertPopUp(" 제목과 내용을 작성해 주세요!", 1200);
          return;
        }

        if (!titleRef.current.value) {
          alertPopUp(" 제목을 작성해 주세요!", 1200);
          return;
        }

        if (!contentRef.current.value) {
          alertPopUp(" 내용을 작성해 주세요!", 1200);
          return;
        }

        const bulletinFormData = new FormData();

        bulletinFormData.append("title", titleRef.current.value);
        bulletinFormData.append("content", contentRef.current.value);

        for (const f of post.fileList) {
          bulletinFormData.append("image", f);
        }

        dispatch(addBulletinPostDB(bulletinFormData))
          .unwrap()
          .then((messgae) => {
            alertPopUp(messgae, 700, false, "/bulletinboard");
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
  const alertPopUp = (message, delay = 700, back = false, url = false) => {
    setPopUp(true);
    setMessage(message);

    setTimeout(() => {
      setPopUp(false);

      back && history.goBack();
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
            style={{ cursor: "pointer" }}
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

        {isCafeLoading || isBoardLoading ? (
          <Button color="#767676">
            {isEdit ? "수정중 입니다! 😉" : "작성중 입니다! 😉"}
          </Button>
        ) : (
          <Button
            color="#000"
            onClick={() => {
              addPost();
            }}
          >
            완료
          </Button>
        )}
      </HeaderInner>

      {/* 작성 부분 */}
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

        {/* 제목 */}
        <TextInput
          height="48px"
          width="100%"
          border="1px solid #999"
          padding="14px 16px"
          borderNone
          ref={titleRef}
          onInput={handleResizeInputHeight("48px", titleRef)}
          onChange={(e) => {
            checkTextLength(e, 100, setTitleLength);
          }}
          placeholder={boardName === "cafeBoard" ? "카페 이름" : "게시글 제목"}
          defaultValue={post ? post.title : ""}
        ></TextInput>

        {/* 위치 */}
        {/* 카페 후기 작성시에만 렌더링 해줌 */}
        {boardName === "cafeBoard" && (
          <LocationBox>
            <DropDownBox>
              {isEdit ? (
                <SelectText>{region}</SelectText>
              ) : (
                <SelectText>{region ? region : "지역 선택"}</SelectText>
              )}
              <DropDownIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsDown(!isDown);
                }}
              />
            </DropDownBox>

            <TextInput
              height="48px"
              width="calc((100% / 3) * 2)"
              border="1px solid #999"
              padding="14px 16px"
              borderNone
              ref={detailLocationRef}
              // onInput={handleResizeInputHeight("27px", locationRef)}
              onChange={(e) => {
                checkTextLength(e, 100, setLocationLength);
              }}
              placeholder="상세 위치 (ex. 홍대 어딘가)"
              defaultValue={
                post && post.location
                  ? post.location.substr(
                      post.location.indexOf(" ") + 1,
                      post.location.length
                    )
                  : ""
              }
            />
          </LocationBox>
        )}
        {isDown && (
          <RegionListBox>
            {regionList.map((r) => (
              <Region
                key={r}
                onClick={() => {
                  setRegion(r);
                }}
              >
                {r}
              </Region>
            ))}
          </RegionListBox>
        )}

        {/* 내용 */}
        <TextInputBox
          // height="240px"
          onChange={handleResizeInputHeight("242px", contentBoxRef)}
          ref={contentBoxRef}
          marginBtm="24px"
        >
          <TextInput
            ref={contentRef}
            height="196px"
            width="100%"
            onInput={handleResizeInputHeight("196px", contentRef)}
            onChange={(e) => {
              checkTextLength(e, 1000, setContentLength);
            }}
            placeholder={
              boardName === "cafeBoard"
                ? "카페 설명을 입력해주세요."
                : "게시글 내용을 작성해주세요."
            }
            defaultValue={post ? post.content : ""}
          />
          <LengthText>{contentLength} / 1000</LengthText>
        </TextInputBox>

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
  width: 375px;
  height: 48px;
  z-index: 1;
  padding: 0px 20px;
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
  color: ${(props) => props.color};
  justify-content: center;
  font-family: "Pretendard-Medium";
`;

const TextInputBox = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  padding: 14px 16px 30px;
  border: 1px solid #999999;
  ${(props) => props.marginBtm && `margin-bottom : ${props.marginBtm};`}
  ${(props) => props.borderNone && `border-bottom : none;`}
  resize: none;
  /* overflow: auto; */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TextInput = styled.textarea`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  ${(props) => props.padding && `padding : ${props.padding};`};
  ${(props) => props.border && `border : ${props.border};`}
  ${(props) => props.borderNone && `border-bottom : none;`}
  resize: none;
  overflow: hidden;
  font-family: "Pretendard-Medium";
  white-space: pre-wrap;
  word-break: break-all;
  &::placeholder {
    color: #999999;
  }
`;

const LocationBox = styled.div`
  width: 100%;
  display: flex;
`;

const DropDownBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 5px 14px 16px;
  height: 48px;
  width: calc(100% / 3);
  border: 1px solid #999999;
  border-right: none;
  border-bottom: none;
`;

const RegionListBox = styled.ul`
  height: 170px;
  width: calc((100% - 40px) / 3);
  position: absolute;
  z-index: 5;
  overflow: auto;
  left: 20px;
  top: 241px;
  background: white;
  ::-webkit-scrollbar {
    display: none;
  }
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.16));
`;

const Region = styled.li`
  height: 48px;
  padding: 14px 36px 14px 16px;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  :hover {
    background-color: #fafafa;
  }
`;

const SelectText = styled.p`
  padding: 2.5px 0px;
  height: 24px;
  font-size: 14px;
  color: #999;
  font-family: "Pretendard-Medium";
`;

const HashTagTitle = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  color: #999999;
`;

const LengthText = styled.p`
  margin-top: -3px;
  text-align: right;
  color: #797979;
  font-size: 12px;
`;

export default BoardWrite;
