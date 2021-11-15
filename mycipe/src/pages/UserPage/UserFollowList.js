import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BigFilterButton } from "../../elements";

import UserCard from "../../components/Card/UserCard";

import ModalBackground from "../../shared/ModalBackground";

import { useParams } from "react-router-dom";

import {
  userFollowingListDB,
  userFollowListDB,
} from "../../redux/Async/userPage";

const UserPageFollowList = (props) => {
  const dispatch = useDispatch();
  const nickname = useParams().nickname;

  const isActive = useSelector((state) => state.modal.isActive);
  const userList = useSelector((state) => state.userPage.userList);
  const isFollower = useSelector((state) => state.userPage.isFollower);

  useEffect(() => {
    if (userList.length === 0 && isFollower === true) {
      dispatch(userFollowListDB(nickname));
    }

    if (userList.length === 0 && isFollower === false) {
      dispatch(userFollowingListDB(nickname));
    }
  }, [dispatch, isFollower, nickname, userList.length]);

  return (
    <>
      <Container>
        {isActive && <ModalBackground />}
        <BigFilterButton
          active={isFollower}
          noneBorderTop
          _onClick={() => {
            dispatch(userFollowListDB(nickname));
          }}
        >
          팔로워
        </BigFilterButton>
        <BigFilterButton
          active={!isFollower}
          noneBorderTop
          _onClick={() => {
            dispatch(userFollowingListDB(nickname));
          }}
        >
          팔로잉
        </BigFilterButton>

        <UserCardList>
          {userList.map((item, idx) => {
            return <UserCard key={idx} {...item} />;
          })}
        </UserCardList>

        {/* 추가 기능 사항 */}
        {/* {nickname === LoginUserNickname ? (
          <UserCardList>
            {userList.map((item, idx) => {
              if (isFollower) return <FollowerCard key={idx} {...item} />;
              else
                return (
                  <FollowingCard key={idx} {...item} followingState={true} />
                );

       
            })}
          </UserCardList>
        ) : (
          <UserCardList>
            {userList.map((item, idx) => {
              if (isFollower) {
                if (LoginUserList.includes(item.nickname)) {
                  return (
                    <FollowingCard key={idx} {...item} followingState={true} />
                  );
                } else {
                  return (
                    <FollowingCard key={idx} {...item} followingState={false} />
                  );
                }
              } else {
                if (LoginUserList.includes(item.nickname)) {
                  return (
                    <FollowingCard key={idx} {...item} followingState={true} />
                  );
                } else {
                  return (
                    <FollowingCard key={idx} {...item} followingState={false} />
                  );
                }
              }
            })}
          </UserCardList>
        )} */}
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
