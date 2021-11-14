import React from "react";
import styled from "styled-components";
import { Button } from "../elements";
import { history } from "../redux/configureStore";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Box>
        <span style={{ color: "#FCB2C3" }}>4</span>04
      </Box>
      <TextBox>
        <br />
        요청하신 페이지를
        <br />
        찾을 수 없습니다.
      </TextBox>
      <Button
        height="1.75rem"
        width="5.5rem"
        _onClick={() => {
          history.push("/main");
        }}
      >
        홈으로 가기
      </Button>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  height: auto;
  position: relative;
  text-align: center;
`;
const Box = styled.div`
  color: #7692e4;
  font-size: 60px;
  margin-top: 300px;
`;
const TextBox = styled.div`
  font-size: 14px;
  line-height: 20px;
`;
