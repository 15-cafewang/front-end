import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";

// components
import Spinner from "../../assets/image/Spinner.gif";
import { SmallFilterButton, ButtonInner } from "../../elements";
import BoardCard from "../../components/Card/BoardCard";
import ModalBackground from "../../shared/ModalBackground";

// async
import {
  getBulletinPostListDB,
  getInfinityScrollDB,
} from "../../redux/Async/bulletinBoard";

// 무한스크롤 hook
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
          ? "sortBy=regDate"
          : "sortBy=likeCount",
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
      <ButtonInner height="32px" small margin="12px 0px 0px">
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
          padding="0px"
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
                    {...b}
                  />
                );
              })}
          </CardList>
          <div ref={target}>{isLoading && <SpinnerImg src={Spinner} />}</div>
        </>
      )}

      {currentSorting.sortedByLikes && (
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
                    {...b}
                  />
                );
              })}
          </CardList>
          <div ref={target}>{isLoading && <SpinnerImg src={Spinner} />}</div>
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
  margin-top: 20px;
  width: 100%;
`;

const SpinnerImg = styled.img``;

export default BulletinBoardMain;
