import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { useParams } from "react-router";
import { history } from "../../redux/configureStore";

import BoardCard from "../../components/Card/BoardCard";
import RecipeCard from "../../components/Card/RecipeCard";

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
  getUserWrittenRecipesDB,
  getInfinityScrollWrittenRecipesDB,
  getUserWrittenBoardsDB,
  getInfinityScrollWrittenBoardsDB,
  getUserLikedRecipesDB,
  getInfinityScrollLikedRecipesDB,
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
    recipe: true,
    bulletinBoard: false,
  });

  //보여줄 게시물 선정하기
  let currentList = [];

  let message = null;

  if (filterButtons.writtenBoard) {
    if (filterButtons.recipe) {
      currentList = pageInfo.postList.userWrittenRecipes;
      message = "공유한 카페가 없습니다.";
    } else {
      currentList = pageInfo.postList.userWrittenBoards;
      message = "작성한 글이 없습니다.";
    }
  } else {
    if (filterButtons.recipe) {
      currentList = pageInfo.postList.userLikedRecipes;
      message = "좋아요한 카폐가 없습니다.";
    } else {
      currentList = pageInfo.postList.userLikedBoards;
      message = "좋아요한 글이 없습니다.";
    }
  }

  useEffect(() => {
    dispatch(getUserInfoDB(userNickname));
    dispatch(getUserWrittenRecipesDB({ page: 1, nickname: userNickname }));
  }, [dispatch, userNickname]);

  // 관찰이 시작될 때 실행될 콜백 함수
  const fetchMoreData = (page) => {
    setIsLoading(true);
    if (filterButtons.writtenBoard) {
      // 유저가 작성한 레시피 보여줄때
      if (filterButtons.recipe) {
        dispatch(
          getInfinityScrollWrittenRecipesDB({
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
      // 유저가 좋아요한 레시피 보여줄때
      if (filterButtons.recipe) {
        dispatch(
          getInfinityScrollLikedRecipesDB({
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

  useInterSectionObserver(fetchMoreData, pageRef, target.current, currentList);

  return (
    <>
      <UserMainInner>
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
              <FollowBtn
                onClick={() => {
                  dispatch(userUnFollowDB(userInfo.nickname));
                }}
              >
                팔로우취소
              </FollowBtn>
            ) : (
              <FollowBtn
                onClick={() => {
                  dispatch(
                    userFollowDB({
                      nickname: userInfo.nickname,
                      image: userInfo.image,
                    })
                  );
                }}
              >
                팔로우하기
              </FollowBtn>
            )}
          </UserProfileContent>
        </UserProfileInner>

        <ButtonInner height="48px">
          <BigFilterButton
            active={filterButtons.writtenBoard}
            _onClick={() => {
              setFilterButtons({
                writtenBoard: true,
                recipe: true,

                likedBoard: false,
                bulletinBoard: false,
              });

              pageRef.current = 1;

              dispatch(
                getUserWrittenRecipesDB({
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
                recipe: true,

                writtenBoard: false,
                bulletinBoard: false,
              });

              pageRef.current = 1;

              dispatch(
                getUserLikedRecipesDB({
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

        <ButtonInner height="32px" small>
          <SmallFilterButton
            active={filterButtons.recipe}
            _onClick={() => {
              setFilterButtons({
                ...filterButtons,
                bulletinBoard: false,
                recipe: true,
              });

              pageRef.current = 1;

              if (filterButtons.writtenBoard) {
                dispatch(
                  getUserWrittenRecipesDB({
                    page: 1,
                    nickname: userInfo.nickname,
                  })
                );
              } else {
                dispatch(
                  getUserLikedRecipesDB({
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
            active={filterButtons.bulletinBoard}
            _onClick={() => {
              setFilterButtons({
                ...filterButtons,
                bulletinBoard: true,
                recipe: false,
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
        {filterButtons.recipe ? (
          <>
            <CardList>
              {isFetching && <SpinnerImg src={Spinner} />}
              {currentList.length !== 0
                ? currentList.map((item, idx) => {
                    return (
                      <RecipeCard
                        key={item.recipeId}
                        recipeId={item.recipeId}
                        image={item.imageList[0]}
                        nickname={item.nickname}
                        title={item.title}
                        likeStatus={item.likeStatus}
                        likeCount={item.likeCount}
                        price={item.price}
                        _onClick={() => {
                          history.push(`/recipeboard/detail/${item.recipeId}`);
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
            <CardList>
              {isFetching && <SpinnerImg src={Spinner} />}
              {currentList.length !== 0
                ? currentList.map((item, idx) => {
                    return (
                      <BoardCard
                        key={item.boardId}
                        boardId={item.boardId}
                        image={item.imageList[0]}
                        title={item.title}
                        likeStatus={item.likeStatus}
                        likeCount={item.likeCount}
                        content={item.content}
                        regDate={item.regDate}
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
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 14px;
  color: #767676;
`;

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Count = styled.span`
  margin-right: 4px;
`;

const FollowBtn = styled(ProfileEditButton)``;

const SpinnerImg = styled.img`
  margin-top: 10vh;
`;

export default UserMain;
