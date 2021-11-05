import React from "react";
import styled from "styled-components";
import { BigFilterButton } from "../../elements";

import UserCard from "../../components/Card/UserCard";

const UserPageFollowList = (props) => {
  return (
    <>
      <BigFilterButton active noneBorderTop>
        팔로워
      </BigFilterButton>
      <BigFilterButton noneBorderTop>팔로잉</BigFilterButton>

      <UserCardList>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </UserCardList>
    </>
  );
};

const UserCardList = styled.ul``;

export default UserPageFollowList;
