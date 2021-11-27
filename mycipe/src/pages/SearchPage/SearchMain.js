import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";

import { ReactComponent as BackIcon } from "../../assets/icon/HeaderIcon/back.svg";
import { ButtonInner, SmallFilterButton } from "../../elements/index";

import ModalBackground from "../../shared/ModalBackground";
import SearchModal from "./SearchModal";

import CafeCard from "../../components/Card/CafeCard";
import BoardCard from "../../components/Card/BoardCard";

import PopUp from "../../shared/PopUp";
import Spinner from "../../assets/image/Spinner.gif";
import Blank from "../../shared/Blank";

import { getSearchCafeDB, getSearchBoardDB } from "../../redux/Async/Search";

import { setSorting } from "../../redux/Modules/searchSlice";

const SearchMain = () => {
  const [popUp, setPopUp] = useState(false);

  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const isFetching = useSelector((state) => state.search.isFetching);

  const cafeList = useSelector((state) => state.search.cafeList);
  const boardList = useSelector((state) => state.search.boardList);

  //현재 게시물이 존재하는지(레시피 or 자유게시물 아무거나뭐든)
  const isList = useSelector((state) => state.search.isList);

  // 검색페이지를올떄 자유게시판에서 왔는지, 레시피게시판에서왔는지를 판단하기위함.
  const whereFrom = useSelector((state) => state.search.whereFrom);

  const hashTag = useSelector((state) => state.search.hashTag);
  const preKeyword = useSelector((state) => state.search.keyword);
  const currentSorting = useSelector((state) => state.search.currentSorting);

  //검색모달 제어변수.
  const [isSearch, setIsSearch] = useState(isList ? false : true);

  //검색어 받는변수
  const inputRef = useRef();

  //모달제어
  const SearchModalRef = useRef();

  // 검색모달창 외부클릭시 닫음.
  useEffect(() => {
    const DetectOutsideClick = () => {
      setIsSearch(false);
      inputRef.current.value = "";
    };

    if (isSearch && isList)
      SearchModalRef.current.addEventListener("click", DetectOutsideClick);

    return () => {
      // 위에 이벤트가 부여됬을떄만 remove시키기위해 옵셔널 체이닝사용.
      SearchModalRef.current?.removeEventListener("click", DetectOutsideClick);
    };
  }, [isSearch]);

  //처음접속시 인풋창 포커스
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //게시물 불러오기(검색된 게시물을 클릭하여 상세페이지로 이동후 뭔가 동작(좋아요,댓글)을 하고 다시 뒤로돌아왔을떄 변경된내용을 반영시키기위해 다시 불러옴)
  // 최초에 검색하고 게시물을 불러올떈 동작하지않는다.
  useEffect(() => {
    // (검색전엔 아무것도 불러오지않은상태니 배열의 길이로 실행여부를 판단함.)
    if (cafeList.length !== 0) {
      if (currentSorting === "byDate") {
        if (hashTag) {
          dispatch(
            getSearchCafeDB({
              keyword: hashTag,
              withTag: true,
              sortBy: "regDate",
            })
          );
        } else {
          dispatch(
            getSearchCafeDB({
              keyword: preKeyword,
              withTag: false,
              sortBy: "regDate",
            })
          );
        }
      } else {
        if (hashTag) {
          dispatch(
            getSearchCafeDB({
              keyword: hashTag,
              withTag: true,
              sortBy: "likeCount",
            })
          );
        } else {
          dispatch(
            getSearchCafeDB({
              keyword: preKeyword,
              withTag: false,
              sortBy: "likeCount",
            })
          );
        }
      }
    }
  }, []);

  useEffect(() => {
    if (boardList.length !== 0) {
      if (currentSorting === "byDate") {
        dispatch(
          getSearchBoardDB({
            keyword: preKeyword,
            sortBy: "regDate",
          })
        );
      } else {
        dispatch(
          getSearchBoardDB({
            keyword: preKeyword,
            sortBy: "likeCount",
          })
        );
      }
    }
  }, []);

  return (
    <>
      <Container>
        {/* alert 창 */}
        <PopUp
          popUp={popUp}
          setPopUp={setPopUp}
          message="입력된 검색어가 없습니다."
          isButton={false}
        />

        {/* 모달 */}
        {isActive && <ModalBackground />}

        {/* 헤더 */}
        <HeaderInner flexBetween>
          <LeftInner>
            <BackIcon
              onClick={() => {
                history.goBack();
              }}
            />
          </LeftInner>

          <SearchInput
            ref={inputRef}
            placeholder="검색어를 입력해 주세요."
            onClick={() => {
              // 검색된 게시물이없으면 인풋창 클릭해도 모달이 닫히지않음.
              if (isList) {
                setIsSearch(!isSearch);
              }
            }}
          />

          <SearchButton
            onClick={() => {
              const keyword = inputRef.current.value;

              if (!keyword) {
                setPopUp(true);
                setTimeout(() => {
                  setPopUp(false);
                }, 700);
              } else {
                if (whereFrom === "cafe") {
                  dispatch(
                    getSearchCafeDB({
                      keyword,
                      withTag: false,
                      sortBy: "regDate",
                    })
                  );
                } else {
                  dispatch(
                    getSearchBoardDB({
                      keyword,
                      sortBy: "regDate",
                    })
                  );
                }

                dispatch(setSorting("byDate"));
                setIsSearch(!isSearch);
              }
            }}
          >
            검색
          </SearchButton>

          {/* 검색모달 */}
          {isActive ? (
            ""
          ) : (
            <SearchModal
              isSearch={isSearch}
              setIsSearch={setIsSearch}
              SearchModalRef={SearchModalRef}
            />
          )}
        </HeaderInner>

        <ListContainer>
          {/* 레시피를 검색했을때만 해쉬태그를 보여줌. */}
          <SelectedHashTagInner cafeList={cafeList.length !== 0 ? true : false}>
            {/* 선택된 해쉬태그가있으면 보여줌 */}
            {hashTag ? <HashTagItem active>{hashTag}</HashTagItem> : ""}
          </SelectedHashTagInner>

          {/* 인기순 & 최신순 버튼 */}
          <ButtonInner small>
            <SmallFilterButton
              active={currentSorting === "byDate" ? true : false}
              _onClick={(e) => {
                //최신순으로 정렬.
                dispatch(setSorting("byDate"));

                // 검색어 받는다.
                let keyword = null;

                // 레시피검색일경우 해쉬태그도 생각해야한다.
                if (whereFrom === "cafe") {
                  if (hashTag) {
                    keyword = hashTag;
                  } else {
                    keyword = inputRef.current.value
                      ? inputRef.current.value
                      : preKeyword;
                  }

                  dispatch(
                    getSearchCafeDB({
                      keyword,
                      withTag: hashTag ? true : false,
                      sortBy: "regDate",
                    })
                  );
                } else {
                  keyword = inputRef.current.value
                    ? inputRef.current.value
                    : preKeyword;
                  dispatch(
                    getSearchBoardDB({
                      keyword,
                      sortBy: "regDate",
                    })
                  );
                }
              }}
            >
              최신순
            </SmallFilterButton>

            <SmallFilterButton
              active={currentSorting === "byLikes" ? true : false}
              _onClick={(e) => {
                dispatch(setSorting("byLikes"));

                let keyword = null;

                if (whereFrom === "cafe") {
                  if (hashTag) {
                    keyword = hashTag;
                  } else {
                    keyword = inputRef.current.value
                      ? inputRef.current.value
                      : preKeyword;
                  }

                  dispatch(
                    getSearchCafeDB({
                      keyword,
                      withTag: hashTag ? true : false,
                      sortBy: "likeCount",
                    })
                  );
                } else {
                  keyword = inputRef.current.value
                    ? inputRef.current.value
                    : preKeyword;
                  dispatch(
                    getSearchBoardDB({
                      keyword,
                      sortBy: "likeCount",
                    })
                  );
                }
              }}
            >
              인기순
            </SmallFilterButton>
          </ButtonInner>
          {/* 목록 뿌려주기 */}
          {whereFrom === "cafe" ? (
            <SearchListInner>
              {isFetching && <SpinnerImg src={Spinner} />}
              {cafeList.length !== 0 // 검색된결과가 없다면 ( == 받아온 배열의 길이가 0 이라면) "게시물이 없습니다 "  보여줌.
                ? cafeList.map((cafe) => (
                    <CafeCard
                      key={cafe.cafeId}
                      {...cafe}
                      image={cafe.images[0]}
                      _onClick={() => {
                        history.push(`/cafeboard/detail/${cafe.cafeId}`);
                      }}
                    />
                  ))
                : !isFetching && <Blank message="조회된 글이 없습니다." />}
            </SearchListInner>
          ) : (
            <SearchListInner>
              {boardList.length !== 0
                ? boardList.map((board) => (
                    <BoardCard
                      key={board.boardId}
                      {...board}
                      _onClick={() => {
                        history.push(`/bulletinboard/detail/${board.boardId}`);
                      }}
                    />
                  ))
                : !isFetching && <Blank message="조회된 글이 없습니다." />}
            </SearchListInner>
          )}
        </ListContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
  margin: 0px 20px;
`;

const ListContainer = styled.div``;

const HeaderInner = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px 0px 22px 0px;
  position: sticky;
  z-index: 0;
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

const LeftInner = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  background-color: #f8f8fa;
  width: 250px;
  height: 28px;
  padding: 14px;

  &::placeholder {
    color: #999999;
    font-size: 14px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #7692e4;
  justify-content: center;
`;

const SearchButton = styled(Button)`
  width: 50px;
  height: 28px;
  background: #191919;

  color: #fff;
`;

const SearchListInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const SelectedHashTagInner = styled.div`
  display: ${(props) => (props.cafeList ? "flex" : "none")};
  /* margin: 12px 0px 20px 20px; */
  overflow: auto;
  white-space: nowrap;

  // 스크롤 숨김
  ::-webkit-scrollbar {
    display: none;
  }
`;

const HashTagItem = styled.div`
  width: 100px;
  height: 36px;
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  margin-right: 8px;

  border: ${(props) =>
    props.active ? `1px solid #7692E4` : `1px solid #191919`};

  font-size: 14px;
  color: ${(props) => (props.active ? `#ffffff` : `#767676`)};
  background-color: ${(props) => (props.active ? `#191919` : `#ffffff`)};
  cursor: pointer;
`;

const SpinnerImg = styled.img`
  margin-top: 25vh;
`;

export default SearchMain;
