"use client";
import { Container, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import React from "react";
import Carosel from "./carosel";
const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(./banner2.jpg)`,
  },
  container:{
    height:400,
    display:"flex",
    flexDirection:"column",
    paddingTop:25,
    justifyContent:"space-around"
  },
  tagline:{
    textAlign:"center",
    display:"flex",
    height:"40%",
    justifyContent:"center",
    flexDirection:"column"
  }
}));
const banner = () => {
  const classes = useStyles();
    // Define the media query
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMobileScreen = useMediaQuery('(max-width: 480px)');
  return <div className={classes.banner}>
    <Container className={classes.container}>
        <div className={classes.tagline}>
            <Typography variant={isMobileScreen ? "h4": isSmallScreen ? "h3" : "h2"} style={{fontWeight:"bold", marginBottom:isSmallScreen ? 0 : 15, fontFamily:"Montserrat"}}>
            Crypto Tracker
            </Typography>
            <Typography variant="subtitle2" style={{ fontFamily:"Montserrat", textTransform:"capitalize", color:"darkgray"}}>
            Get All The Info Regarding Your Favorite Crypto Currency
            </Typography>
        </div>
        <Carosel/>
    </Container>
  </div>;
};

export default banner;
