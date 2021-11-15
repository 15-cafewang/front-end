import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { ButtonInner, SmallFilterButton } from "../../elements/index";
import RecipeCard from "../../components/Card/RecipeCard";
import ModalBackground from "../../shared/ModalBackground";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { history } from "../../redux/configureStore";

import SearchModal from "./SearchModal";

const SearchMain = (props) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);

  const [isSearch, setIsSearch] = useState(false);
  const [isList, setIsList] = useState(true);

  const inputRef = useRef();
  const hashRef = useRef();

  // 검색모달창 외부클릭시 닫음.
  useEffect(() => {
    const DetectOutsideClick = (e) => {
      e.stopPropagation();
      console.log(e);
      //좌표로 잡는다.

      setIsSearch(false);
      inputRef.current.value = "";
    };

    if (isSearch && isList === true)
      window.addEventListener("click", DetectOutsideClick);

    return () => {
      window.removeEventListener("click", DetectOutsideClick);
    };
  }, [isList, isSearch]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Container>
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
            onClick={(e) => {
              if (isList) {
                setIsSearch(!isSearch);
              }
              // e.stopPropagation();
              // ClickedModal();
              // if (inputRef.current.value) {
              //   setIsList(!isList);
              // }

              // if (isList) {
              //   setIsSearch(true);
              //   setIsList(false);
              // }
            }}
          />

          <SearchButton>검색</SearchButton>

          {/* 검색모달 */}
          {isActive ? (
            ""
          ) : (
            <SearchModal isSearch={isSearch} hashRef={hashRef} />
          )}
        </HeaderInner>

        <ListContainer isList={isList}>
          <SelectedHashTagInner>
            <HashTagItem active>#청량한</HashTagItem>
            <HashTagItem active>#고소한</HashTagItem>
            <HashTagItem active>#고소한</HashTagItem>
            <HashTagItem active>#고소한</HashTagItem>
            <HashTagItem active>#고소한</HashTagItem>
            <HashTagItem active>#고소한</HashTagItem>
            <HashTagItem active>#고소한</HashTagItem>
            <HashTagItem active>#고소한</HashTagItem>
          </SelectedHashTagInner>

          <ButtonInner small>
            <SmallFilterButton active>최신순</SmallFilterButton>
            <SmallFilterButton>인기순</SmallFilterButton>
          </ButtonInner>

          <SearchListInner>
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </SearchListInner>
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

const ListContainer = styled.div`
  display: ${(props) => (props.isList ? "block" : "none")};
`;

const HeaderInner = styled.div`
  width: 100%;
  height: 48px;

  position: sticky;
  z-index: 1;
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
  border-radius: 6px;
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
  background: #7692e4;
  border-radius: 6px;
  color: #fff;
`;

const SearchListInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const SelectedHashTagInner = styled.div`
  display: flex;
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
    props.active ? `1px solid #7692E4` : `1px solid #dbdbdb`};
  border-radius: 6px;
  font-size: 14px;
  color: ${(props) => (props.active ? `#ffffff` : `#767676`)};
  background-color: ${(props) => (props.active ? `#7692E4` : `#ffffff`)};
  cursor: pointer;
`;

export default SearchMain;
