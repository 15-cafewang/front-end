import React from "react";
import styled from "styled-components";

const UserCard = (props) => {
  const following = true;

  if (following) {
    return (
      <>
        <UserCardInner between>
          <Grid>
            <UserProfileImage />
            <Text>닉네임</Text>
          </Grid>
          <FollowingButton>팔로잉</FollowingButton>
        </UserCardInner>
      </>
    );
  }

  return (
    <>
      <UserCardInner>
        <UserProfileImage />
        <Text>닉네임</Text>
      </UserCardInner>
    </>
  );
};

const UserCardInner = styled.li`
  display: flex;
  justify-content: ${(props) =>
    props.between ? "space-between" : "flex-start"};
  margin: 20px;
  align-items: center;
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  margin-left: 20px;
`;

const FollowingButton = styled.button`
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 14px;
  color: #767676;
`;

const UserProfileImage = styled.img`
  background-color: red;
  border-radius: 50%;
  width: 56px;
  height: 56px;
`;

export default UserCard;
