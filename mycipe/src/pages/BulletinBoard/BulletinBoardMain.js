import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
// components
import { SmallFilterButton, ButtonInner } from "../../elements";
import BoardCard from "../../components/Card/BoardCard";
import ModalBackground from "../../shared/ModalBackground";
// async
import {
  getBulletinPostListDB,
  getInfinityScrollDB,
} from "../../redux/Async/bulletinBoard";
import { useInterSectionObserver } from "../../hooks";

const BulletinBoardMain = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const boardList = useSelector(
    (state) => state.bulletinBoard && state.bulletinBoard.boardList
  );

  const [currentSorting, setCurrentSorting] = useState({
    sortedByDate: true,
    sortedByLikes: false,
  });

  const target = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(1);

  console.log(target.current);
  useEffect(() => {
    dispatch(
      getBulletinPostListDB({
        page: 1,
        sortBy: currentSorting.sortedByDate
          ? "sortBy=regDate"
          : "sortBy=likeCount",
      })
    );
  }, [currentSorting.sortedByDate, dispatch]);

  const fetchMoreBoard = (page) => {
    setIsLoading(true);
    dispatch(
      getInfinityScrollDB({
        page: page,
        sortBy: currentSorting.sortedByDate
          ? "sortBy=regDate&sortByLike=false"
          : "sortBy=regDate&sortByLike=true",
      })
    )
      .unwrap()
      .then(() => {
        setIsLoading(false);
      });
  };

  useInterSectionObserver(fetchMoreBoard, pageRef, target.current, boardList);

  return (
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
            pageRef.current = 1;
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
            pageRef.current = 1;
          }}
        >
          인기순
        </SmallFilterButton>
      </ButtonInner>

      {currentSorting.sortedByDate && (
        <>
          <CardList>
            {boardList &&
              boardList.map((b, idx) => {
                return (
                  <BoardCard
                    _onClick={() => {
                      history.push(`/bulletinboard/detail/${b.boardId}`);
                    }}
                    key={b.boardId}
                    boardId={b.boardId}
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
          <div ref={target}>{isLoading && "loading..."}</div>
        </>
      )}

      {currentSorting.sortedByLikes && (
        <>
          <CardList>
            {boardList &&
              boardList.map((r, idx) => {
                return (
                  <BoardCard
                    _onClick={() => {
                      history.push(`/bulletinboard/detail/${r.boardId}`);
                    }}
                    key={r.boardId}
                    boardId={r.boardId}
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
          <div ref={target}>{isLoading && "loading..."}</div>
        </>
      )}
    </BoardMainContainer>
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

const CardList = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default BulletinBoardMain;
