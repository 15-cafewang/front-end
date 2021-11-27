import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BigFilterButton } from "../../elements";

import UserCard from "../../components/Card/UserCard";

import ModalBackground from "../../shared/ModalBackground";
import Blank from "../../shared/Blank";

import { useParams } from "react-router-dom";

import {
  userFollowingListDB,
  userFollowListDB,
} from "../../redux/Async/userPage";

import { setIsFollower } from "../../redux/Modules/userPageSlice";

const UserPageFollowList = (props) => {
  const dispatch = useDispatch();
  const nickname = useParams().nickname;

  const isActive = useSelector((state) => state.modal.isActive);
  const userList = useSelector((state) => state.userPage.userList);
  const isFollower = useSelector((state) => state.userPage.isFollower);

  useEffect(() => {
    if (isFollower) {
      dispatch(userFollowListDB(nickname));
    } else {
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
            dispatch(setIsFollower(true));
          }}
        >
          팔로워
        </BigFilterButton>
        <BigFilterButton
          active={!isFollower}
          noneBorderTop
          _onClick={() => {
            dispatch(setIsFollower(false));
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
