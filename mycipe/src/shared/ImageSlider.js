import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// elements
import Image from "../elements/Image";

const ImageSlider = (props) => {
  const { src } = props;
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <StyledSlider {...settings}>
        <Container>
          <Image shape="rectangle" size="large" src={src} />
        </Container>
        <Container>
          <Image shape="rectangle" size="large" src={src} />
        </Container>
        <Container>
          <Image shape="rectangle" size="large" src={src} />
        </Container>
        <Container>
          <Image shape="rectangle" size="large" src={src} />
        </Container>
      </StyledSlider>
    </>
  );
};

const StyledSlider = styled(Slider)`
  .slick-slider {
    outline: none;
    width: 320px;
  }

  .slick-list {
    width : 320px;
    margin : 0 auto;
  }

  .slick-dots {
    bottom : 10px;

    & li.slick-active button::before{
      color : #ffffff;
    } 
  }
`;

const Container = styled.div`
  width: 320px;
  height: 320px;
`;

export default ImageSlider;
