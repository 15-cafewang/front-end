import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ReactComponent as DeleteIcon } from "../../assets/icon/SearchModalIcon/delete.svg";

import HashTag from "../../shared/HashTag";
import { getSearchCafeDB, getSearchBoardDB } from "../../redux/Async/Search";

import Popup from "../../shared/PopUp";

import {
  deleteAllCafeKeyword,
  deleteCafeKeyword,
  deleteAllBoardKeyword,
  deleteBoardKeyword,
} from "../../redux/Modules/searchSlice";

const SearchModal = ({ isSearch, setIsSearch }) => {
  const dispatch = useDispatch();

  const [popUp, setPopUp] = useState(false);

  // 카페 후기게시판 or 자유게시판 중 어디서 왔는지 판단해주는 변수
  const whereFrom = useSelector((state) => state.search.whereFrom);

  //카페 후기 최근검색목록 리스트
  const cafeSearchList = useSelector((state) => state.search.cafeSearchList);

  //자유게시판 최근검색목록 리스트
  const boardSearchList = useSelector((state) => state.search.boardSearchList);

  return (
    <>
      <SearchModalInner isSearch={isSearch}>
        <RecentSearchInner>
          <Grid padding="42px 0px 0px 0px">
            {/* alert 창 */}
            <Popup
              popUp={popUp}
              setPopUp={setPopUp}
              message="삭제할 검색기록이 없습니다."
              isButton={false}
            />

            <Text grey>최근 검색어</Text>

            {/* 전체삭제 버튼 */}
            <DeleteAllButton
              onClick={() => {
                if (whereFrom === "cafe") {
                  if (cafeSearchList.length === 0) {
                    setPopUp(true);
                    setTimeout(() => {
                      setPopUp(false);
                    }, 700);
                  } else {
                    dispatch(deleteAllCafeKeyword());
                  }
                } else {
                  if (boardSearchList.length === 0) {
                    setPopUp(true);
                    setTimeout(() => {
                      setPopUp(false);
                    }, 700);
                  } else dispatch(deleteAllBoardKeyword());
                }
              }}
            >
              모두 지우기
            </DeleteAllButton>
          </Grid>

          <SearchWordList>
            {/* 카페 후기에서 왔으면 카페 후기 최근검색목록  아니면 자유게시판 최근검색목록 보여주기 */}
            {whereFrom === "cafe"
              ? cafeSearchList.map((keyword) => {
                  return (
                    <SearchWordInner key={keyword}>
                      {/* 최근검색어 누르면 그 검색어를 키워드로 검색 */}
                      <Text
                        onClick={(e) => {
                          dispatch(
                            getSearchCafeDB({
                              keyword,
                              withTag: false,
                              sortBy: "regDate",
                            })
                          );

                          setIsSearch(!isSearch);
                        }}
                      >
                        {keyword}
                      </Text>
                      {/* persist로 설정하게되면 기본값으로  \"\" 값이 배열의 요소로 들어가있어 키워드가 없어도 취소버튼만 보여진다.(왜그러는진 찾아보는중) 그래서 키워드가 없으면 취소버튼도 안보여주기위해 &&연산자 사용.   */}
                      {keyword && (
                        <DeleteIcon
                          cursor="pointer"
                          onClick={() => {
                            dispatch(deleteCafeKeyword(keyword));
                          }}
                        />
                      )}
                    </SearchWordInner>
                  );
                })
              : boardSearchList.map((keyword) => {
                  return (
                    <SearchWordInner key={keyword}>
                      <Text
                        onClick={(e) => {
                          dispatch(
                            getSearchBoardDB({
                              keyword,
                              sortBy: "regDate",
                            })
                          );

                          setIsSearch(!isSearch);
                        }}
                      >
                        {keyword}
                      </Text>
                      {keyword && (
                        <DeleteIcon
                          onClick={() => {
                            dispatch(deleteBoardKeyword(keyword));
                          }}
                        />
                      )}
                    </SearchWordInner>
                  );
                })}
          </SearchWordList>
        </RecentSearchInner>
        <>
          {/* 해쉬태그검색은 카페 후기검색에만 있는 기능이니 카페 후기게시판에서 이동했는지 확인 */}
          {whereFrom === "cafe" && (
            <>
              <Grid margin="16px 0px">
                <Text grey>추천 키워드</Text>
              </Grid>
              <Grid center padding="0px 0px 32px 0px">
                <HashTag
                  isSearch={isSearch}
                  fromSearch={true}
                  _onClick={(e) => {
                    if (e.target.nodeName === "LI") {
                      const hashTag = e.target.innerHTML.substr(1);

                      dispatch(
                        getSearchCafeDB({
                          keyword: hashTag,
                          withTag: true,
                          sortBy: "regDate",
                        })
                      );

                      setIsSearch(!isSearch);
                    }
                  }}
                />
              </Grid>
            </>
          )}
        </>
      </SearchModalInner>
    </>
  );
};

const SearchModalInner = styled.div`
  height: auto;

  background: #ffffff;
  position: absolute;
  padding: 0px 20px;
  top: 48px;
  right: 0px;
  width: 100%;
  height: auto;

  display: ${(props) => (props.isSearch ? "block" : "none")};
`;

const RecentSearchInner = styled.div`
  border-radius: 0px 0px 6px 6px;
`;

const Text = styled.span`
  font-size: 14px;
  ${(props) => props.grey && "color : #999"};
  cursor: pointer;
`;

const DeleteAllButton = styled.button`
  color: #999;
  cursor: pointer;
`;

const Grid = styled.div`
  display: flex;
  justify-content: ${(props) => (props.center ? "center" : "space-between")};
  margin: ${(props) => (props.margin ? props.margin : 0)};
  padding: ${(props) => (props.padding ? props.padding : 0)};
`;

const SearchWordInner = styled(Grid)`
  margin: 16px 0px;
`;

const SearchWordList = styled.div`
  margin-bottom: 60px;
`;

export default SearchModal;
