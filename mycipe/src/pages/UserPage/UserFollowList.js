import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { BigFilterButton } from "../../elements";

import UserCard from "../../components/Card/UserCard";
import ModalBackground from "../../shared/ModalBackground";

const UserPageFollowList = (props) => {
  const isActive = useSelector((state) => state.modal.isActive);

  return (
    <>
      <Container>
        {isActive && <ModalBackground />}
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
      </Container>
    </>
  );
};

const Container = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
`;

const UserCardList = styled.ul``;

export default UserPageFollowList;
