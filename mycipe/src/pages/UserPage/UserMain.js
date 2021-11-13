import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useHistory, useParams } from "react-router";
import { history } from "../../redux/configureStore";
import BoardCard from "../../components/Card/BoardCard";
import RecipeCard from "../../components/Card/RecipeCard";

import {
  BigFilterButton,
  SmallFilterButton,
  ButtonInner,
} from "../../elements";

import ModalBackground from "../../shared/ModalBackground";

//thunkAsync
import {
  getUserInfoDB,
  getUserWrittenRecipesDB,
  getUserWrittenBoardsDB,
  getUserLikedRecipesDB,
  getUserLikedBoardsDB,
  userFollowDB,
  userUnFollowDB,
  userFollowListDB,
  userFollowingListDB,
} from "../../redux/Async/userPage";

//sliceAction
import { resetPost } from "../../redux/Modules/userPageSlice";

const UserMain = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userNickname = useParams().nickname;

  //모달
  const isActive = useSelector((state) => state.modal.isActive);

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

  useEffect(() => {
    dispatch(getUserInfoDB(userNickname));
    dispatch(getUserWrittenRecipesDB(userNickname));
  }, [dispatch, userNickname]);

  const [filterButtons, setFilterButtons] = useState({
    writtenBoard: true,
    likedBoard: false,
    recipe: true,
    bulletinBoard: false,
  });

  //보여줄 게시물 선정하기
  let currentList = [];

  if (filterButtons.writtenBoard) {
    if (filterButtons.recipe)
      currentList = pageInfo.postList.userWrittenRecipes;
    else currentList = pageInfo.postList.userWrittenBoards;
  } else {
    if (filterButtons.recipe) currentList = pageInfo.postList.userLikedRecipes;
    else currentList = pageInfo.postList.userLikedBoards;
  }

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
                  dispatch(userFollowListDB(userInfo.nickname));
                  history.push(`/userpagefollowlist/${userInfo.nickname}`);
                }}
              >
                <Count>{userInfo.followingCount}</Count>
                팔로워
              </Button>

              <Button
                onClick={() => {
                  dispatch(userFollowingListDB(userInfo.nickname));
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

              dispatch(getUserWrittenRecipesDB(userInfo.nickname));

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

              dispatch(getUserLikedRecipesDB(userInfo.nickname));

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
              if (filterButtons.writtenBoard) {
                dispatch(getUserWrittenRecipesDB(userInfo.nickname));
              } else {
                dispatch(getUserLikedRecipesDB(userInfo.nickname));
              }

              dispatch(resetPost());
            }}
          >
            레시피
          </SmallFilterButton>

          <SmallFilterButton
            active={filterButtons.bulletinBoard}
            _onClick={() => {
              setFilterButtons({
                ...filterButtons,
                bulletinBoard: true,
                recipe: false,
              });
              if (filterButtons.writtenBoard) {
                dispatch(getUserWrittenBoardsDB(userInfo.nickname));
              } else {
                dispatch(getUserLikedBoardsDB(userInfo.nickname));
              }

              dispatch(resetPost());
            }}
          >
            게시판
          </SmallFilterButton>
        </ButtonInner>

        {filterButtons.recipe ? (
          <CardList>
            {currentList.map((item, idx) => {
              return (
                <RecipeCard
                  key={item.recipeId}
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
            })}
          </CardList>
        ) : (
          <CardList>
            {currentList.map((item, idx) => {
              return (
                <BoardCard
                  key={item.boardId}
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
            })}
          </CardList>
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

export default UserMain;
