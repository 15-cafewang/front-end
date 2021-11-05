import React from "react";
import styled, { css } from "styled-components";
import BoardCard from "../../components/Card/BoardCard";
import RecipeCard from "../../components/Card/RecipeCard";
import {
  BigFilterButton,
  SmallFilterButton,
  ButtonInner,
} from "../../elements";

const UserMain = (props) => {
  return (
    <>
      <UserMainInner>
        <UserProfileInner>
          <UserProfileImage />

          <UserProfileContent>
            <Text>닉네임</Text>
            <Grid flexBetween>
              <Button>
                <Count>1K</Count>
                팔로워
              </Button>

              <Button>
                <Count>400</Count>
                팔로잉
              </Button>
            </Grid>
            <ProfileEditButton>프로필편집</ProfileEditButton>
          </UserProfileContent>
        </UserProfileInner>

        <ButtonInner height="48px">
          <BigFilterButton active>게시글</BigFilterButton>
          <BigFilterButton>좋아요</BigFilterButton>
        </ButtonInner>

        <ButtonInner height="32px" small>
          <SmallFilterButton active>레시피</SmallFilterButton>
          <SmallFilterButton>게시판</SmallFilterButton>
        </ButtonInner>

        <CardList>
          {/* <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard /> */}
          <BoardCard />
          <BoardCard />
        </CardList>
      </UserMainInner>
    </>
  );
};

const UserMainInner = styled.div`
  height: 100%;
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

export default UserMain;
