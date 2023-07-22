"use client";
import { Typography, useMediaQuery, styled } from "@mui/material";
import React from "react";
import Carosel from "./carosel";

const BannerStyle = styled('div')(({theme})=>({
  backgroundImage: `url(./banner2.jpg)`,
}
))
const Container = styled('div')(({theme})=>({
  height:400,
  display:"flex",
  flexDirection:"column",
  paddingTop:25,
  justifyContent:"space-around"
}))
const Tagline = styled('div')(({theme})=>({
  textAlign:"center",
  display:"flex",
  height:"40%",
  justifyContent:"center",
  flexDirection:"column"
}))

const Banner = () => {
    // Define the media query
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMobileScreen = useMediaQuery('(max-width: 480px)');
  return <BannerStyle>
    <Container >
        <Tagline>
            <Typography variant={isMobileScreen ? "h4": isSmallScreen ? "h3" : "h2"} style={{fontWeight:"bold", marginBottom:isSmallScreen ? 0 : 15, fontFamily:"Montserrat"}}>
            Crypto Tracker
            </Typography>
            <Typography variant="subtitle2" style={{ fontFamily:"Montserrat", textTransform:"capitalize", color:"darkgray"}}>
            Get All The Info Regarding Your Favorite Crypto Currency
            </Typography>
        </Tagline>
        <Carosel/>
    </Container>
  </BannerStyle>;
};

export default Banner;
