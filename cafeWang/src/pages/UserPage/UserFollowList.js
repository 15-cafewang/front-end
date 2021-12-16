import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { history } from "../../redux/configureStore";

import { BigFilterButton } from "../../elements";

import UserCard from "../../components/Card/UserCard";
import ModalBackground from "../../shared/ModalBackground";
import Blank from "../../shared/Blank";
import Header from "../../shared/Header";

import {
  userFollowingListDB,
  userFollowListDB,
} from "../../redux/Async/userPage";

const UserPageFollowList = () => {
  const dispatch = useDispatch();
  const nickname = useParams().nickname;
  const pageName = useParams().pagename;

  const isActive = useSelector((state) => state.modal.isActive);
  const userList = useSelector((state) => state.userPage.userList);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });

    if (pageName === "follower") {
      dispatch(userFollowListDB(nickname));
    } else {
      dispatch(userFollowingListDB(nickname));
    }
  }, [dispatch, pageName, nickname, userList.length]);

  return (
    <>
      <Header />
      <Container>
        {isActive && <ModalBackground />}
        <BigFilterButton
          active={pageName === "follower"}
          noneBorderTop
          _onClick={() => {
            history.replace(`/userpagefollowlist/${nickname}/follower`);
          }}
        >
          팔로워
        </BigFilterButton>
        <BigFilterButton
          active={pageName === "following"}
          noneBorderTop
          _onClick={() => {
            history.replace(`/userpagefollowlist/${nickname}/following`);
          }}
        >
          팔로잉
        </BigFilterButton>

        <UserCardList>
          {userList.length !== 0 ? (
            userList.map((item, idx) => {
              return <UserCard key={idx} {...item} />;
            })
          ) : (
            <Blank message="팔로우 / 팔로잉한 유저가 없습니다." />
          )}
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
