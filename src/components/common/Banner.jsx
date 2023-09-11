import React from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const HeroContainer = styled(Box)`
  height: 10rem;
  width: 100%;
  background-image: url("https://source.unsplash.com/random");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroText = styled(Typography).attrs({
  component: "h1",
})`
  && {
    font-size: 2.5rem;
    text-align: center;
    color: white;
    @media (min-width: 768px) {
      font-size: 3rem;
    }
    @media (min-width: 1024px) {
      font-size: 4rem;
    }
  }
`;

const HeroBanner = ({ title }) => {
  return (
    <HeroContainer>
      <HeroText>{title}</HeroText>
    </HeroContainer>
  );
};

export default HeroBanner;
