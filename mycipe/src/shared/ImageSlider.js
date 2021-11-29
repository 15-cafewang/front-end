import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// elements
import Image from "../elements/Image";

const ImageSlider = ({ imageList, isBanner, bannerList }) => {
  const settings = {
    // 아래 dots 줄 것인가
    dots: true,
    // 좌우 화살표 줄 것인가
    arrows: false,
    // 레이지 로딩할 거야?
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // 자동 넘김을 할 것인가. 한다면 스피드는?
    autoplay: isBanner ? true : false,
    autoplaySpeed: isBanner ? 2500 : false,
    // 화면에 올리면 슬라이더가 자동으로 넘어가지 않음
    pauseOnHover: true,
  };

  if (isBanner) {
    return (
      <>
        <StyledBanner {...settings}>
          {bannerList &&
            bannerList.map((banner, idx) => {
              return (
                <Container key={idx} height="200px">
                  <Image
                    shape="rectangle"
                    size="large2"
                    src={banner.img}
                    position="relative"
                    _onClick={() => {
                      // history.push(`/usermain/${banner.kinginfo.nickname}`);
                    }}
                  >
                    <ImageContent>
                      <Text>
                        {banner.title}왕은 <br />
                        <span>{banner.kinginfo?.nickname}</span>님
                        <br />
                        입니다!
                      </Text>
                    </ImageContent>
                  </Image>
                </Container>
              );
            })}
        </StyledBanner>
      </>
    );
  } else {
    return (
      <>
        <StyledSlider {...settings}>
          {imageList &&
            imageList.map((image) => {
              return (
                <Container key={image} height="315px">
                  <Image shape="rectangle" size="large" src={image} />
                </Container>
              );
            })}
        </StyledSlider>
      </>
    );
  }
};

const Text = styled.p`
  text-align: center;
  font-weight: 900;
  color: #fff;
  font-size: 20px;
  letter-spacing: 0.15px;
  -webkit-text-stroke: 0.5px #191919;
`;

const StyledSlider = styled(Slider)`
  .slick-slider {
    outline: none;
    /* width: 320px; */
    width: 100%;
  }

  .slick-list {
    width: 100%;
    margin: 0 auto;
  }

  .slick-dots {
    bottom: 10px;

    & li.slick-active button::before {
      color: #ffffff;
    }
  }
`;

const StyledBanner = styled(StyledSlider)`
  .slick-slider {
    outline: none;
    width: 320px;
  }

  .slick-list {
    width: 375px;
    margin: 0 auto;
    margin-left: -20px;
  }

  .slick-dots {
    bottom: 13px;

    & li.slick-active button::before {
      color: #ffffff;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  position: relative;
`;

const ImageContent = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45.5%;
  left: 50%;

  /* top: 10%;
  left: 50%; */
`;

export default ImageSlider;
