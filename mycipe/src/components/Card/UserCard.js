import React from "react";
import styled, { css } from "styled-components";
import { Image } from "../../elements/index.js";

import { history } from "../../redux/configureStore";

const UserCard = ({
  nickname = "노강표",
  image,
  isrank = false,
  rank = 0,
  category = "팔로우",
  count = 100,
}) => {
  if (isrank) {
    return (
      <>
        <UserCardInner between margin="16px 0px">
          <Grid>
            <Text margin="0px 17px 0px 9px" size="20px">
              {rank}
            </Text>
            <Image
              shape="circle"
              size="medium"
              src={image}
              _onClick={() => {
                history.push(`/usermain/${nickname}`);
              }}
            />

            <GridRight margin="0px 0px 0px 20px">
              <Text size="14px">{nickname}</Text>
              <GridRight>
                <Text size="14px" color="#999">
                  {category} 수
                </Text>
                <Text size="14px" margin="0px 0px 0px 9px">
                  {count}개
                </Text>
              </GridRight>
            </GridRight>
          </Grid>
        </UserCardInner>
        <Line />
      </>
    );
  } else {
    return (
      <>
        <UserCardInner between>
          <Grid>
            <Image
              shape="circle"
              size="medium"
              src={image}
              _onClick={() => {
                history.push(`/usermain/${nickname}`);
              }}
            />
            <Text size="16px" margin="0px 0px 0px 20px">
              {nickname}
            </Text>
          </Grid>
        </UserCardInner>
      </>
    );
  }
};

const UserCardInner = styled.li`
  display: flex;
  justify-content: ${(props) =>
    props.between ? "space-between" : "flex-start"};
  margin: ${(props) => (props.margin ? props.margin : "")};
  align-items: center;
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
`;

const GridRight = styled.div`
  margin: ${(props) => (props.margin ? props.margin : "")};
`;

const Text = styled.span`
  color: ${(props) => (props.color ? props.color : "#000")};
  font-size: ${(props) => (props.size ? props.size : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #ededed;
`;

// const FollowingButton = styled.button`
//   border: 1px solid #dbdbdb;
//   border-radius: 4px;
//   padding: 4px 12px;
//   font-size: 14px;
//   color: #767676;
// `;

// const FollowButton = styled(FollowingButton)`
//   color: #fff;
//   background: #7692e4;
// `;

// const UserProfileImage = styled.img`
//   background-color: red;
//   border-radius: 50%;
//   width: 56px;
//   height: 56px;
// `;

export default UserCard;
