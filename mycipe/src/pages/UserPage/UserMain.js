import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import BoardCard from "../../components/Card/BoardCard";
import RecipeCard from "../../components/Card/RecipeCard";
import {
  BigFilterButton,
  SmallFilterButton,
  ButtonInner,
} from "../../elements";
import ModalBackground from "../../shared/ModalBackground";

import { getUserInfoDB } from "../../redux/Async/userPage";
import { useHistory, useParams } from "react-router";

const UserMain = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userNickname = useParams().nickname;

  //모달
  const isActive = useSelector((state) => state.modal.isActive);
  const loginUserInfo = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.userPage.userInfo);

  //로그인안하면 로그인페이지로 보내기
  if (!loginUserInfo.isLogin) {
    history.replace("/");
  }

  // 마이페이지인지 판단.
  const loginUserNickname = loginUserInfo.userInfo.nickname;
  let isMe = false;
  if (loginUserNickname === userNickname) {
    isMe = true;
  }

  useEffect(() => {
    dispatch(getUserInfoDB(userNickname));
  }, [dispatch, userNickname]);

  const [BigFilterButtons, setBigFilterButtons] = useState({
    writtenBoard: false,
    likedBoard: false,
  });

  const [smallFilterButtons, setSmallFilterButtons] = useState({
    recipe: false,
    bulletinBoard: false,
  });

  return (
    <>
      <UserMainInner>
        {isActive && <ModalBackground />}

        <UserProfileInner>
          <UserProfileImage />

          <UserProfileContent>
            <Text>{userInfo.nickname}</Text>
            <Grid flexBetween>
              <Button>
                <Count>{userInfo.followCount}</Count>
                팔로워
              </Button>

              <Button>
                <Count>{userInfo.followingCount}</Count>
                팔로잉
              </Button>
            </Grid>
            {isMe ? (
              <ProfileEditButton>프로필편집</ProfileEditButton>
            ) : userInfo.followStatus ? (
              <FollowBtn>팔로우취소</FollowBtn>
            ) : (
              <FollowBtn>팔로우하기</FollowBtn>
            )}
          </UserProfileContent>
        </UserProfileInner>

        <ButtonInner height="48px">
          <BigFilterButton
            active={BigFilterButtons.writtenBoard}
            _onClick={() => {
              setBigFilterButtons({ writtenBoard: true, likedBoard: false });
            }}
          >
            게시글
          </BigFilterButton>
          <BigFilterButton
            active={BigFilterButtons.likedBoard}
            _onClick={() => {
              setBigFilterButtons({ writtenBoard: false, likedBoard: true });
            }}
          >
            좋아요
          </BigFilterButton>
        </ButtonInner>

        <ButtonInner height="32px" small>
          <SmallFilterButton
            active={smallFilterButtons.recipe}
            _onClick={() => {
              setSmallFilterButtons({ recipe: true, bulletinBoard: false });
            }}
          >
            레시피
          </SmallFilterButton>

          <SmallFilterButton
            active={smallFilterButtons.bulletinBoard}
            _onClick={() => {
              setSmallFilterButtons({ recipe: false, bulletinBoard: true });
            }}
          >
            게시판
          </SmallFilterButton>
        </ButtonInner>

        <CardList>
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <BoardCard />
          <BoardCard />
        </CardList>
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
  background-color: red;
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
