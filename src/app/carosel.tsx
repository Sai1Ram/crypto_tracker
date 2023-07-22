"use client";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "@/config/api";
import { CryptoState } from "./context/context";
import { Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const CaroselStyles = styled("div")(({theme})=>({
  height: "50%",
  display: "flex",
  alignItems: "center",
}))
const LinkStyle = styled("a")(({theme})=>({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

const Carosel = () => {
  const { currency, symbol } = CryptoState();
  const [trendingCoins, setTredingCoins] = useState([]);

  // Define the media query
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMobileScreen = useMediaQuery('(max-width: 480px)');
  const items = trendingCoins.map((coin, index) => {

    return (
      <LinkStyle href={`/coins/${coin["uuid"]}`} key={index}>
        <Image
          key={index}
          src={coin["iconUrl"]}
          alt={coin["symbol"]}
          priority
          width={isMobileScreen ? 30 : isSmallScreen ? 45 : 85}
          height={isMobileScreen ? 30 : isSmallScreen ? 45 : 85}
        />
        <Typography style={{display:"flex", gap:10, fontSize:isMobileScreen ? 10 : 15}}>{coin["symbol"]}
            {coin["change"] >= 0 ?
                <Typography style={{color:"green", fontSize:isMobileScreen ? 10 : 15 }} component={"span"}>
                    +{coin["change"]}%
                </Typography>
            :
            <Typography style={{color: "red", fontSize: isMobileScreen ? 10 : 15}} component={"span"}>
                    {coin["change"]}%
            </Typography>
        }
        </Typography>
        <Typography style={{fontSize: isSmallScreen ? 15 : 20}}>{symbol + parseFloat(coin["price"]).toFixed(3)}</Typography>
      </LinkStyle>
    );

  });

  const responsive = {
    0: {
      items: 3,
    },
    620: {
      items: 6,
    },
  };
  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
          },
        };
        const response = await fetch(TrendingCoins(currency), options);
        const data = await response.json();
        setTredingCoins(data.data.coins);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrendingCoins();
  }, [currency]);

  return (
    <CaroselStyles>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        items={items}
      />
    </CaroselStyles>
  );
};

export default Carosel;
