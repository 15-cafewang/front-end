import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

import HashTag from "../../shared/HashTag";
import { getSearchRecipeDB, getSearchBoardDB } from "../../redux/Async/Search";

import {
  deleteAllRecipeKeyword,
  deleteRecipeKeyword,
  deleteAllBoardKeyword,
  deleteBoardKeyword,
} from "../../redux/Modules/searchSlice";

const SearchModal = ({ isSearch, setIsSearch, SearchModalRef }) => {
  const dispatch = useDispatch();

  // 레시피게시판 or 자유게시판 중 어디서 왔는지 판단해주는 변수
  const whereFrom = useSelector((state) => state.search.whereFrom);

  //레시피 최근검색목록 리스트
  const recipeSearchList = useSelector(
    (state) => state.search.recipeSearchList
  );

  //자유게시판 최근검색목록 리스트
  const boardSearchList = useSelector((state) => state.search.boardSearchList);

  return (
    <>
      <SearchMidalBackground ref={SearchModalRef} isSearch={isSearch} />
      <SearchModalInner isSearch={isSearch}>
        <RecentSearchInner>
          <Grid margin="32px 0px 0px 0px">
            <Text grey>최근 검색어</Text>

            {/* 전체삭제 버튼 */}
            <DeleteAllButton
              onClick={() => {
                if (whereFrom === "recipe") {
                  if (recipeSearchList.length === 0) {
                    window.alert("삭제할 검색기록이 없습니다.");
                  } else dispatch(deleteAllRecipeKeyword());
                } else {
                  if (boardSearchList.length === 0) {
                    window.alert("삭제할 검색기록이 없습니다.");
                  } else dispatch(deleteAllBoardKeyword());
                }
              }}
            >
              모두 지우기
            </DeleteAllButton>
          </Grid>

          <SearchWordList>
            {/* 레시피에서 왔으면 레시피 최근검색목록  아니면 자유게시판 최근검색목록 보여주기 */}
            {whereFrom === "recipe"
              ? recipeSearchList.map((keyword) => {
                  return (
                    <SearchWordInner key={keyword}>
                      {/* 최근검색어 누르면 그 검색어를 키워드로 검색 */}
                      <Text
                        onClick={(e) => {
                          dispatch(
                            getSearchRecipeDB({
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
                            dispatch(deleteRecipeKeyword(keyword));
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

          <>
            {/* 해쉬태그검색은 레시피검색에만 있는 기능이니 레시피게시판에서 이동했는지 확인 */}
            {whereFrom === "recipe" && (
              <>
                <Grid margin="16px 0px">
                  <Text grey>추천 키워드</Text>
                </Grid>
                <Grid center>
                  <HashTag
                    isSearch={isSearch}
                    _onClick={(e) => {
                      if (e.target.nodeName === "LI") {
                        const hashTag = e.target.innerHTML.substr(1);

                        dispatch(
                          getSearchRecipeDB({
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
        </RecentSearchInner>
      </SearchModalInner>
    </>
  );
};

const SearchMidalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0;
  top: 0px;
  left: 0px;

  display: ${(props) => (props.isSearch ? "block" : "none")};
`;

const SearchModalInner = styled.div`
  height: auto;

  background: #ffffff;
  position: absolute;

  top: 48px;
  width: 100%;
  height: auto;

  display: ${(props) => (props.isSearch ? "block" : "none")};
`;

const RecentSearchInner = styled.div``;

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
`;

const SearchWordInner = styled(Grid)`
  margin: 16px 0px;
`;

const SearchWordList = styled.div`
  margin-bottom: 60px;
`;

export default SearchModal;