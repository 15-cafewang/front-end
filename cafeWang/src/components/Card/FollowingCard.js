// import React, { useState } from "react";
// import styled from "styled-components";
// import { Image } from "../../elements/index.js";

// import { history } from "../../redux/configureStore";

// import { userUnFollowDB, userFollowDB } from "../../redux/Async/userPage";
// import { useDispatch } from "react-redux";

// const FollowingCard = ({ nickname, image, followingState }) => {
//   const [toggleFollowing, setToggleFollowing] = useState(followingState);

//   const dispatch = useDispatch();
//   console.log("내 팔로잉");
//   // 내 팔로잉 or 남의 팔로워,팔로잉
//   //
//   return (
//     <>
//       <UserCardInner between>
//         <Grid>
//           <Image
//             shape="circle"
//             size="medium"
//             src={image}
//             _onClick={() => {
//               history.push(`/usermain/${nickname}`);
//             }}
//           />
//           <Text>{nickname}</Text>
//         </Grid>
//         {toggleFollowing ? (
//           <FollowingButton
//             onClick={() => {
//               dispatch(userUnFollowDB(nickname));
//               setToggleFollowing(false);
//             }}
//           >
//             팔로잉
//           </FollowingButton>
//         ) : (
//           <FollowButton
//             onClick={() => {
//               dispatch(userFollowDB(nickname));
//               setToggleFollowing(true);
//             }}
//           >
//             팔로우
//           </FollowButton>
//         )}
//       </UserCardInner>
//     </>
//   );
// };

// const UserCardInner = styled.li`
//   display: flex;
//   justify-content: ${(props) =>
//     props.between ? "space-between" : "flex-start"};
//   margin: 20px;
//   align-items: center;
// `;

// const Grid = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Text = styled.span`
//   margin-left: 20px;
// `;

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

// // const UserProfileImage = styled.img`
// //   background-color: red;
// //   border-radius: 50%;
// //   width: 56px;
// //   height: 56px;
// // `;

// export default FollowingCard;
