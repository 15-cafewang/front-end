import React from "react";
import styled from "styled-components";

import ImageUpload from "../../shared/ImageUpload";
import { ReactComponent as Back } from "../../assets/back.svg";

const BoardWrite = ({ boardName }) => {
  return (
    <>
      <BoardHeader>
        <Back />
      </BoardHeader>
      <ImageUpload />
    </>
  );
};

const BoardHeader = styled.div`
  margin: 0px 16px 14px 16px;
`;

export default BoardWrite;
