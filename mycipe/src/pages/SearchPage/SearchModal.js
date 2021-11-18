import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

import HashTag from "../../shared/HashTag";
import { getSearchRecipeDB } from "../../redux/Async/Search";

const SearchModal = ({ isSearch, setIsSearch, SearchModalRef }) => {
  const dispatch = useDispatch();

  const whereFrom = useSelector((state) => state.search.whereFrom);

  const hashTagRef = useRef();

  return (
    <>
      <SearchMidalBackground ref={SearchModalRef} isSearch={isSearch} />
      <SearchModalInner isSearch={isSearch}>
        <RecentSearchInner>
          <Grid margin="32px 0px 0px 0px">
            <Text grey>최근 검색어</Text>
            <DeleteAllButton>모두 지우기</DeleteAllButton>
          </Grid>
          <SearchWordList>
            <SearchWordInner>
              <Text>무언가 검색한 기록</Text>
              <DeleteIcon />
            </SearchWordInner>
            <SearchWordInner>
              <Text>무언가 검색한 기록</Text>
              <DeleteIcon />
            </SearchWordInner>
            <SearchWordInner>
              <Text>무언가 검색한 기록</Text>
              <DeleteIcon />
            </SearchWordInner>
          </SearchWordList>

          <>
            {whereFrom === "recipe" ? (
              <>
                <Grid margin="16px 0px">
                  <Text grey>추천 키워드</Text>
                </Grid>
                <Grid center>
                  <HashTag
                    ref={hashTagRef}
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
            ) : (
              ""
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
`;

const DeleteAllButton = styled.button`
  color: #999;
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
