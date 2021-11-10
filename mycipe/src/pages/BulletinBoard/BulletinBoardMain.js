import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
// components
import BoardCard from "../../components/Card/BoardCard";
import ModalBackground from "../../shared/ModalBackground";
// async
import { getBulletinPostListDB } from "../../redux/Async/bulletinBoard";

const BulletinBoardMain = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const boardList = useSelector(
    (state) => state.bulletinBoard && state.bulletinBoard.boardList
  );

  useEffect(() => {
    dispatch(getBulletinPostListDB());
  }, []);

  return (
    <>
      <BoardMainContainer>
        {isActive && <ModalBackground />}
        {/* 정렬 박스 */}
        <SortingBox>
          <SortingItem>최신순</SortingItem>
          <SortingItem>인기순</SortingItem>
        </SortingBox>
        {/* boardId: 20 commentCount: 0 content: "ㅇㅇㅇ" image: null likeCount: 0
        likeStatus: false nickname: "박하린" regDate:
        "2021-11-09T11:09:14.40108" title: "ㅇㅇㅇ" */}
        <CardList>
          {boardList &&
            boardList.map((b, idx) => {
              return (
                <BoardCard
                  _onClick={() => {
                    history.push(`/bulletinboard/detail/${b.boardId}`);
                  }}
                  key={b.boardId}
                  commentCount={b.commentCount}
                  content={b.content}
                  image={b.image}
                  likeCount={b.likeCount}
                  likeStatus={b.likeStatus}
                  nickname={b.nickname}
                  regDate={b.regDate
                    .split("T")[0]
                    .replace("-", ". ")
                    .replace("-", ". ")}
                  title={b.title}
                />
              );
            })}
        </CardList>
      </BoardMainContainer>
    </>
  );
};

const BoardMainContainer = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
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

export default BulletinBoardMain;
