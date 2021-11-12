import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
// components
import { SmallFilterButton, ButtonInner } from "../../elements";
import BoardCard from "../../components/Card/BoardCard";
import ModalBackground from "../../shared/ModalBackground";
// async
import { getBulletinPostListDB } from "../../redux/Async/bulletinBoard";

const BulletinBoardMain = () => {
  const dispatch = useDispatch();
  const [currentSorting, setCurrentSorting] = useState({
    sortedByDate: true,
    sortedByLikes: false,
  });
  const isActive = useSelector((state) => state.modal.isActive);
  const boardList = useSelector(
    (state) => state.bulletinBoard && state.bulletinBoard.boardList
  );

  useEffect(() => {
    if (currentSorting.sortedByDate) {
      dispatch(getBulletinPostListDB("sortBy=regDate"));
    } else {
      dispatch(getBulletinPostListDB("sortBy=likeCount"));
    }
  }, [currentSorting.sortedByDate, dispatch]);

  return (
    <>
      <BoardMainContainer>
        {isActive && <ModalBackground />}
        {/* 정렬 박스 */}
        <ButtonInner height="32px" small>
          <SmallFilterButton
            active={currentSorting.sortedByDate}
            _onClick={() => {
              setCurrentSorting({
                sortedByDate: true,
                sortedByLikes: false,
              });
            }}
          >
            최신순
          </SmallFilterButton>
          <SmallFilterButton
            active={currentSorting.sortedByLikes}
            _onClick={() => {
              setCurrentSorting({
                sortedByDate: false,
                sortedByLikes: true,
              });
            }}
          >
            인기순
          </SmallFilterButton>
        </ButtonInner>

        {currentSorting.sortedByDate && (
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
                    regDate={
                      b.regDate
                        ? b.regDate
                            .split("T")[0]
                            .replace("-", ". ")
                            .replace("-", ". ")
                        : ""
                    }
                    title={b.title}
                  />
                );
              })}
          </CardList>
        )}

        {currentSorting.sortedByLikes && (
          <CardList>
            {boardList &&
              boardList.map((r, idx) => {
                return (
                  <BoardCard
                    _onClick={() => {
                      history.push(`/bulletinboard/detail/${r.boardId}`);
                    }}
                    key={r.boardId}
                    commentCount={r.commentCount}
                    content={r.content}
                    image={r.image}
                    likeCount={r.likeCount}
                    likeStatus={r.likeStatus}
                    nickname={r.nickname}
                    price={r.price}
                    title={r.title}
                    regDate={
                      r.regDate &&
                      r.regDate
                        .split("T")[0]
                        .replace("-", ". ")
                        .replace("-", ". ")
                    }
                  />
                );
              })}
          </CardList>
        )}
      </BoardMainContainer>
    </>
  );
};

const BoardMainContainer = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
  padding: 0px 20px 10px;
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
