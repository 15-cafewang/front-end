import React, { useState, useEffect } from "react";
import styled from "styled-components";

const hashTagStrList = [
  "화이트톤",
  "인생샷",
  "힙한",
  "디저트",
  "귀여운",
  "야외공간",
  "애견동반",
  "몽환적인",
  "아늑한",
  "비건",
  "스터디",
];

const HashTag = ({
  tags,
  post = null,
  setPost = () => {},
  isSearch = true,
  _onClick = () => {},
  fromSearch = false,
}) => {
  const [hashTagList, setHashTagList] = useState(
    // initialValue는 모두 false로 만들어준다.
    hashTagStrList.map((hashTagName) => {
      return {
        name: hashTagName,
        active: tags ? tags.includes(hashTagName) : false,
      };
    })
  );
  // 모달이 열려있을땐 누를수있게함 (기본값)
  useEffect(() => {
    if (!isSearch) return;
    let clickedHashTagList = hashTagList
      .filter(({ active }) => active)
      .map(({ name }) => name);

    setPost({ ...post, tags: clickedHashTagList });
  }, [hashTagList, isSearch]);

  //모달닫을떄 초기화시킨다.
  useEffect(() => {
    if (isSearch) return;

    let resetHashTagList = hashTagList.map((tag) => {
      return {
        name: tag.name,
        active: false,
      };
    });
    setHashTagList(resetHashTagList);
  }, [isSearch]);

  const toggleHashTag = (currentTag) => {
    // 현재 클릭한 태그의 상태가 true이면 나머지는 그대로 두고, 클릭한 태그의 상태만 false로 다시 뱌꿔준다.
    if (currentTag.active === true) {
      const newHashTagList = hashTagList.map((tag, idx) => {
        return tag.name === currentTag.name ? { ...tag, active: false } : tag;
      });
      setHashTagList(newHashTagList);
    }

    // 현재 클릭한 태그의 상태가 false이면 나머지는 그대로 두고, 클릭한 태그의 상태만 true로 다시 뱌꿔준다.
    else {
      const newHashTagList = hashTagList.map((tag, idx) => {
        return tag.name === currentTag.name ? { ...tag, active: true } : tag;
      });
      setHashTagList(newHashTagList);
    }
  };

  return (
    <>
      <HashTagBox
        onClick={_onClick}
        width={fromSearch ? "calc(100% - 20px)" : "calc(100% - 30px)"}
      >
        {hashTagList.map((tag, idx) => {
          return (
            <HashTagItem
              key={tag.name}
              onClick={() => {
                toggleHashTag(tag);
              }}
              active={tag.active}
            >
              #{tag.name}
            </HashTagItem>
          );
        })}
      </HashTagBox>
    </>
  );
};

const HashTagBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.width};
  height: 8rem;

  & > :nth-child(5) {
    margin-left: calc((50% - 120px) / 2);
  }

  & > :nth-child(7) {
    margin-right: calc((50% - 120px) / 2);
  }
`;

const HashTagItem = styled.li`
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 8px 10px;

  border: ${(props) =>
    props.active ? `1px solid black;` : `1px solid #999999;`};
  font-size: 14px;
  color: ${(props) => (props.active ? `#ffffff` : `#767676`)};
  background-color: ${(props) => (props.active ? `#191919;` : `#ffffff`)};
  cursor: pointer;
`;

export default HashTag;
