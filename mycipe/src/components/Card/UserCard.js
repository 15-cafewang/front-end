import React from "react";
import styled from "styled-components";
import { Image } from "../../elements/index.js";

import { history } from "../../redux/configureStore";

const UserCard = ({ nickname, image }) => {
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
          <Text>{nickname}</Text>
        </Grid>
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
