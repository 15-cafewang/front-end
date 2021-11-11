import React, { useState, useEffect } from "react";
import styled from "styled-components";
const hashTagStrList = [
  "#청량한",
  "#고소한",
  "#단짠",
  "#디카페인",
  "#달달한",
  "#아이스",
  "#따뜻한",
  "#새콤달콤한",
  "#시험기간에 필수",
  "#당충전",
];

const HashTag = ({ tags, post, setPost }) => {
  const [hashTagList, setHashTagList] = useState(
    // initialValue는 모두 false로 만들어준다.
    hashTagStrList.map((hashTagName) => {
      return {
        name: hashTagName,
        active: tags ? tags.includes(hashTagName) : false,
      };
    })
  );

  useEffect(() => {
    const clickedHashTagList = hashTagList
      .filter(({ active }) => active)
      .map(({ name }) => name);

    setPost({ ...post, tags: clickedHashTagList });
  }, [hashTagList]);

  console.log(post);
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
      <HashTagBox>
        {hashTagList.map((tag, idx) => {
          return (
            <HashTagItem
              key={tag.name}
              onClick={() => {
                toggleHashTag(tag);
              }}
              active={tag.active}
            >
              {tag.name}
            </HashTagItem>
          );
        })}
      </HashTagBox>
    </>
  );
};

const HashTagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 302px;
  height: 124px;

  & > :nth-child(5) {
    margin-left: 49.5px;
  }

  & > :nth-child(7) {
    margin-right: 39.5px;
  }
`;

const HashTagItem = styled.div`
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  border: ${(props) =>
    props.active ? `1px solid #7692E4` : `1px solid #dbdbdb`};
  border-radius: 6px;
  font-size: 14px;
  color: ${(props) => (props.active ? `#ffffff` : `#767676`)};
  background-color: ${(props) => (props.active ? `#7692E4` : `#ffffff`)};
  cursor: pointer;
`;

export default HashTag;
