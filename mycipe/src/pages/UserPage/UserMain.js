import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

import _ from "lodash";
import { useParams } from "react-router";
import { history } from "../../redux/configureStore";

import BoardCard from "../../components/Card/BoardCard";
import CafeCard from "../../components/Card/CafeCard";

import Header from "../../shared/Header";
import BottomNav from "../../shared/BottomNav";

import {
  BigFilterButton,
  SmallFilterButton,
  ButtonInner,
} from "../../elements";

import ModalBackground from "../../shared/ModalBackground";
import Spinner from "../../assets/image/Spinner.gif";
import Blank from "../../shared/Blank";

//thunkAsync
import {
  getUserInfoDB,
  getUserWrittencafesDB,
  getInfinityScrollWrittencafesDB,
  getUserWrittenBoardsDB,
  getInfinityScrollWrittenBoardsDB,
  getUserLikedcafesDB,
  getInfinityScrollLikedcafesDB,
  getUserLikedBoardsDB,
  getInfinityScrollLikeBoardsDB,
  userFollowDB,
  userUnFollowDB,
} from "../../redux/Async/userPage";

//sliceAction
import { resetPost, setIsFollower } from "../../redux/Modules/userPageSlice";

//interSectionObserver
import { useInterSectionObserver } from "../../hooks";

const UserMain = (props) => {
  const dispatch = useDispatch();
  const userNickname = useParams().nickname;

  //모달
  const isActive = useSelector((state) => state.modal.isActive);
  //스피너
  const isFetching = useSelector((state) => state.userPage.isFetching);

  console.log(isFetching);
  //로그인 유저정보, 페이지 정보 불러오기
  const loginUserInfo = useSelector((state) => state.user);
  const pageInfo = useSelector((state) => state.userPage);
  const userInfo = pageInfo.userInfo;

  // 마이페이지인지 판단.
  let isMe = false;
  const loginUserNickname = loginUserInfo.userInfo.nickname;
  if (loginUserNickname === userNickname) {
    isMe = true;
  }

  const target = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(1);

  const [filterButtons, setFilterButtons] = useState({
    writtenBoard: true,
    likedBoard: false,
    cafe: true,
    bulletinBoard: false,
  });

  //보여줄 게시물 선정하기
  let currentList = [];

  let message = null;

  if (filterButtons.writtenBoard) {
    if (filterButtons.cafe) {
      currentList = pageInfo.postList.userWrittencafes;
      message = "공유한 카페가 없습니다.";
    } else {
      currentList = pageInfo.postList.userWrittenBoards;
      message = "작성한 글이 없습니다.";
    }
  } else {
    if (filterButtons.cafe) {
      currentList = pageInfo.postList.userLikedcafes;
      message = "좋아요한 카페가 없습니다.";
    } else {
      currentList = pageInfo.postList.userLikedBoards;
      message = "좋아요한 글이 없습니다.";
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    dispatch(getUserInfoDB(userNickname));
    dispatch(getUserWrittencafesDB({ page: 1, nickname: userNickname }));
  }, [dispatch, userNickname]);

  // 관찰이 시작될 때 실행될 콜백 함수
  const fetchMoreData = (page) => {
    setIsLoading(true);
    if (filterButtons.writtenBoard) {
      // 유저가 작성한 카페 후기 보여줄때
      if (filterButtons.cafe) {
        dispatch(
          getInfinityScrollWrittencafesDB({
            page: page,
            nickname: userNickname,
          })
        )
          .unwrap()
          .then(() => {
            setIsLoading(false);
          });
      }
      // 유저가 작성한 게시글 보여줄때
      else {
        dispatch(
          getInfinityScrollWrittenBoardsDB({
            page: page,
            nickname: userNickname,
          })
        )
          .unwrap()
          .then(() => {
            setIsLoading(false);
          });
      }
    } else {
      // 유저가 좋아요한 카페 후기 보여줄때
      if (filterButtons.cafe) {
        dispatch(
          getInfinityScrollLikedcafesDB({
            page: page,
            nickname: userNickname,
          })
        )
          .unwrap()
          .then(() => {
            setIsLoading(false);
          });
      }

      //유저가 좋아요한 게시글 보여줄때
      else {
        dispatch(
          getInfinityScrollLikeBoardsDB({
            page: page,
            nickname: userNickname,
          })
        )
          .unwrap()
          .then(() => {
            setIsLoading(false);
          });
      }
    }
  };

  // 게시물 불러오기 무한스크롤
  useInterSectionObserver(fetchMoreData, pageRef, target.current, currentList);

  //팔로우 & 언팔로우
  const followDebounce = _.debounce(() => {
    dispatch(userFollowDB(userInfo.nickname));
  }, 150);

  const unFollowDebounce = _.debounce(() => {
    dispatch(userUnFollowDB(userInfo.nickname));
  }, 150);

  return (
    <>
      <UserMainInner>
        <Header />
        {isActive && <ModalBackground />}

        <UserProfileInner>
          <UserProfileImage src={userInfo.image} />

          <UserProfileContent>
            <Text>{userInfo.nickname}</Text>
            <Grid flexBetween>
              <Button
                onClick={() => {
                  dispatch(setIsFollower(true));
                  history.push(`/userpagefollowlist/${userInfo.nickname}`);
                }}
              >
                <Count>{userInfo.followingCount}</Count>
                팔로워
              </Button>

              <Button
                onClick={() => {
                  dispatch(setIsFollower(false));
                  history.push(`/userpagefollowlist/${userInfo.nickname}`);
                }}
              >
                <Count>{userInfo.followCount}</Count>
                팔로잉
              </Button>
            </Grid>
            {isMe ? (
              <ProfileEditButton
                onClick={() => {
                  history.push("/userpageprofileedit");
                }}
              >
                프로필편집
              </ProfileEditButton>
            ) : userInfo.followStatus ? (
              <FollowBtn onClick={unFollowDebounce}>팔로우취소</FollowBtn>
            ) : (
              <FollowBtn active onClick={followDebounce}>
                팔로우하기
              </FollowBtn>
            )}
          </UserProfileContent>
        </UserProfileInner>

        <ButtonInner height="48px" margin="12px -20px">
          <BigFilterButton
            active={filterButtons.writtenBoard}
            _onClick={() => {
              setFilterButtons({
                writtenBoard: true,
                cafe: true,

                likedBoard: false,
                bulletinBoard: false,
              });

              pageRef.current = 1;

              dispatch(
                getUserWrittencafesDB({
                  page: 1,
                  nickname: userInfo.nickname,
                })
              );
              dispatch(resetPost());
            }}
          >
            게시글
          </BigFilterButton>
          <BigFilterButton
            active={filterButtons.likedBoard}
            _onClick={() => {
              setFilterButtons({
                likedBoard: true,
                cafe: true,

                writtenBoard: false,
                bulletinBoard: false,
              });

              pageRef.current = 1;

              dispatch(
                getUserLikedcafesDB({
                  page: 1,
                  nickname: userInfo.nickname,
                })
              );
              dispatch(resetPost());
            }}
          >
            좋아요
          </BigFilterButton>
        </ButtonInner>

        <ButtonInner height="32px" small margin="12px -20px">
          <SmallFilterButton
            active={filterButtons.cafe}
            _onClick={() => {
              setFilterButtons({
                ...filterButtons,
                bulletinBoard: false,
                cafe: true,
              });

              pageRef.current = 1;

              if (filterButtons.writtenBoard) {
                dispatch(
                  getUserWrittencafesDB({
                    page: 1,
                    nickname: userInfo.nickname,
                  })
                );
              } else {
                dispatch(
                  getUserLikedcafesDB({
                    page: 1,
                    nickname: userInfo.nickname,
                  })
                );
              }

              dispatch(resetPost());
            }}
          >
            카페
          </SmallFilterButton>

          <SmallFilterButton
            padding="0px"
            active={filterButtons.bulletinBoard}
            _onClick={() => {
              setFilterButtons({
                ...filterButtons,
                bulletinBoard: true,
                cafe: false,
              });

              pageRef.current = 1;

              if (filterButtons.writtenBoard) {
                dispatch(
                  getUserWrittenBoardsDB({
                    page: 1,
                    nickname: userInfo.nickname,
                  })
                );
              } else {
                dispatch(
                  getUserLikedBoardsDB({
                    page: 1,
                    nickname: userInfo.nickname,
                  })
                );
              }
              dispatch(resetPost());
            }}
          >
            자유게시판
          </SmallFilterButton>
        </ButtonInner>

        {/* 게시물 보여주기 */}
        {filterButtons.cafe ? (
          <>
            <CardList margin="-12px 20px 0px">
              {isFetching && <SpinnerImg src={Spinner} />}
              {currentList.length !== 0
                ? currentList.map((item, idx) => {
                    return (
                      <CafeCard
                        {...item}
                        image={item.imageList[0]}
                        _onClick={() => {
                          history.push(`/cafeboard/detail/${item.cafeId}`);
                        }}
                      />
                    );
                  })
                : !isFetching && <Blank message={message} />}
            </CardList>
            <div ref={target}>{isLoading && "loading..."}</div>
          </>
        ) : (
          <>
            <CardList margin="0px 20px ">
              {isFetching && <SpinnerImg src={Spinner} />}
              {currentList.length !== 0
                ? currentList.map((item, idx) => {
                    return (
                      <BoardCard
                        {...item}
                        image={item.imageList[0]}
                        _onClick={() => {
                          history.push(`/bulletinboard/detail/${item.boardId}`);
                        }}
                      />
                    );
                  })
                : !isFetching && <Blank message={message} />}
            </CardList>
            <div ref={target}>{isLoading && "loading..."}</div>
          </>
        )}
        <BottomNav />
      </UserMainInner>
    </>
  );
};

const UserMainInner = styled.div`
  position: relative;
  height: auto;
  min-height: calc(100% - 60px);
  width: 100%;
`;

const UserProfileInner = styled.div`
  display: flex;
  padding: 25px 20px;
`;

const Grid = styled.div`
  width: 137px;
  font-size: 14px;
  margin: 4px 0px 20px 0px;
  ${(props) =>
    props.flexBetween &&
    css`
      display: flex;
      justify-content: space-between;
    `};
`;

const UserProfileImage = styled.img`
  /* background-color: red; */
  border-radius: 50%;
  width: 56px;
  height: 56px;
`;

const UserProfileContent = styled.div`
  margin-left: 20px;
`;

const Button = styled.button`
  color: #999;
`;

const ProfileEditButton = styled.button`
  border: 1px solid #999999;

  padding: 4px 12px;
  font-size: 14px;
  color: #767676;
`;

const FollowBtn = styled(ProfileEditButton)`
  font-weight: 500;

  ${(props) =>
    props.active &&
    css`
      color: #ffffff;
      background: #191919;
      border: 1px solid #fff;
    `}
`;

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${(props) => props.margin};
`;

const Text = styled.span`
  font-size: 14px;
`;

const Count = styled.span`
  margin-right: 4px;
`;

const SpinnerImg = styled.img`
  margin-top: 10vh;
`;

export default UserMain;
