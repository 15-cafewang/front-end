import React from 'react';
import { history } from "../../redux/configureStore";

import styled from 'styled-components';
import { Button } from "../../elements";

import Slider from 'react-slick';

 
import tutorial01 from "../../assets/image/tutorial/tutorial01.svg";
import tutorial02 from "../../assets/image/tutorial/tutorial02.svg";
import tutorial03 from "../../assets/image/tutorial/tutorial03.svg";



const Tutorial = () => {
    return (
        <>
        <Container>
            <StyledSlider {...settings}>
         <img 
         alt="tutorial"
         src={tutorial01}/>
          <img 
         alt="tutorial"
         src={tutorial02}/>
          <img 
         alt="tutorial"
         src={tutorial03}/>
         </StyledSlider>
         <ButtonGrid>
         <Button
         _onClick={() =>{
             history.push("/intro")
         }}
        >
         <Text>로그인 하러가기</Text>
         </Button>
         </ButtonGrid>
         </Container>
        </>
    )
}

export default Tutorial

const Container = styled.div`
  margin-top:60px;
`

const ButtonGrid = styled.div`
margin-top:60px;
`

const Text = styled.div`
  color: white;
`;

const settings = {
    dots: true, // 슬라이드 밑에 점 보이게
    infinite: false, // 무한으로 반복
    speed: 500,
    autoplay: false,
    autoplaySpeed: 500, // 넘어가는 속도
    slidesToShow: 1, 
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    centerMode: true,
    centerPadding: '0px', 
  };


const StyledSlider = styled(Slider)`
  .slick-list {
    width: 375px;
    margin: 0 auto;
  }
  .slick-dots li {
    margin: 0 0rem;
  }
  .slick-dots {
    bottom: 0
    .slick-active {
      button::before {
        color: black;
      }
    }
  }
`;

