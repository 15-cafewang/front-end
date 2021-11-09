import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import BoardCard from "../components/Card/BoardCard";
import ModalBackground from "../../shared/ModalBackground";

const BoardMain = ({ boardName }) => {
  const isActive = useSelector((state) => state.modal.isActive);
  const src = "";

  return (
    <>
      <BoardMainContainer>
        {isActive && <ModalBackground />}
        {/* 정렬 박스 */}
        <SortingBox>
          <SortingItem>최신순</SortingItem>
          <SortingItem>인기순</SortingItem>
        </SortingBox>

        <CardList>
          <BoardCard />
          {/* <BoardCard src={src} />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard src={src} />
            <BoardCard />
            <BoardCard />
            <BoardCard /> */}
        </CardList>
      </BoardMainContainer>
    </>
  );
};

const BoardMainContainer = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
  /* height: 100%; */
  /* overflow-y: auto; */
  padding: 12px 20px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SortingBox = styled.div`
  height: 32px;
  display: flex;
  position: relative;
  left: 120px;
`;

const SortingItem = styled.div`
  margin: 0px 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #767676;
`;

const CardList = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RecipeBoardMain;
