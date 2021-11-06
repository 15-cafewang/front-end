import React from "react";
import styled from "styled-components";

// elements
import Image from "../elements/Image";

const ImageSlider = (props) => {
  const { src } = props;

  return (
    <>
      <SliderContainer>
        <Box>
          <Image slide shape="rectangle" size="large" src={src}></Image>
        </Box>
        <Box>
          <Image slide shape="rectangle" size="large" src={src}></Image>
        </Box>
        <Box>
          <Image slide shape="rectangle" size="large" src={src}></Image>
        </Box>
      </SliderContainer>
    </>
  );
};

const SliderContainer = styled.div`
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Box = styled.div`
  display: flex;
  scroll-snap-align: center;
`;
export default ImageSlider;
