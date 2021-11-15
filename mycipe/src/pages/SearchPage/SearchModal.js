import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import HashTag from "../../shared/HashTag";
import ModalBackground from "../../shared/ModalBackground";
// import { ReactComponent as BackIcon } from "../../assets/back.svg";
// import { history } from "../../redux/configureStore";

const SearchModal = ({ isSearch, hashRef }) => {
  // const isActive = useSelector((state) => state.modal.isActive);
  const searchRecipe = true;

  return (
    <>
      <SearchModalInner isSearch={isSearch}>
        {/* 바텀모달 */}
        {/* {isActive && <ModalBackground />} */}

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
                <HashTag ref={hashRef} />
              </Grid>
            </>
          ) : (
            ""
          )}
        </RecentSearchInner>
      </SearchModalInner>
    </>
  );
};

const SearchModalInner = styled.div`
  height: auto;
  /* min-height: calc(100% - 60px); */
  background: #ffffff;
  position: absolute;

  top: 48px;
  width: 100%;
  height: auto;

  display: ${(props) => (props.isSearch ? "block" : "none")};
`;

const RecentSearchInner = styled.div``;

// const HeaderInner = styled.div`
//   width: 100%;
//   height: 48px;
//   z-index: 1;
//   position: sticky;
//   top: 0;

//   background: #fff;
//   display: flex;
//   align-items: center;
//   ${(props) =>
//     props.flexBetween &&
//     css`
//       justify-content: space-between;
//     `}
// `;

// const LeftInner = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Button = styled.button`
//   display: flex;
//   align-items: center;
//   font-size: 16px;
//   color: #7692e4;
//   justify-content: center;
// `;

// const SearchButton = styled(Button)`
//   width: 50px;
//   height: 28px;
//   background: #7692e4;
//   border-radius: 6px;
//   color: #fff;
// `;

// const SearchInput = styled.input`
//   background-color: #f8f8fa;
//   border-radius: 6px;
//   width: 250px;
//   height: 28px;
//   padding: 14px;

//   &::placeholder {
//     color: #999999;
//     font-size: 14px;
//   }
// `;

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
