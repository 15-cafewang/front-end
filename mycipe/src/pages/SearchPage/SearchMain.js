import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import HashTag from "../../shared/HashTag";
import ModalBackground from "../../shared/ModalBackground";

const SearchMain = (props) => {
  const isActive = useSelector((state) => state.modal.isActive);
  const searchRecipe = true;

  return (
    <>
      <SearchMainInner>
        {isActive && <ModalBackground />}
        <RecentSearchInner>
          <Grid>
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

          {searchRecipe ? (
            <>
              <Grid margin="16px 0px">
                <Text grey>추천 키워드</Text>
              </Grid>
              <Grid center>
                <HashTag />
              </Grid>
            </>
          ) : (
            ""
          )}
        </RecentSearchInner>
      </SearchMainInner>
    </>
  );
};

const SearchMainInner = styled.div`
  height: auto;
  min-height: calc(100% - 70px);
  margin: 20px 20px 0px;
`;

const RecentSearchInner = styled.div``;

// const TitleInner = styled.div``;

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

export default SearchMain;
