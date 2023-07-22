"use client";
import { cryptoState } from "@/app/context/context";
import Head from "@/app/head";
import { HistoricalChart, SingleCoinApi } from "@/config/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import SelectButton from "./SelectButton";
import Loading from "@/app/loading"
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'; // Import the necessary scale
import { CircularProgress, ThemeProvider, Typography, createTheme,  useMediaQuery } from "@mui/material";
import { styled } from '@mui/material/styles';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

interface PageProps {
  params: {
    id: string;
  };
}

interface Coin {
  name: string;
  symbol: string;
  price: string;
  uuid: string;
  iconUrl: string;
  change: string;
  description: string;
  marketCap: string;
  rank: number;
}


const App = styled('div')(({ theme }) => ({
  backgroundColor: "#14161a",
  height: "100vh",
  color: "white",
  [theme.breakpoints.down('sm')]: {
    minHeight: "100vh",
    height: "auto",
  }
}));

const Container = styled('div')(({ theme }) => ({
  display: "flex",
  padding: 25,
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    padding: 15,
  }
}));

const LeftBox = styled('div')(({ theme }) => ({
  width: "35%",
  borderRight: "solid 5px gray",
  borderBottom: "solid 0px gray",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flexDirection: "column",
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    borderBottom: "solid 5px gray",
    borderRight: "solid 0px gray",
    paddingBottom: 5
  }
}));

const InfoTitle = styled('div')(({ theme }) => ({
  fontSize: 30,
  fontWeight: "bold",
  fontFamily: "Montserrat",
  [theme.breakpoints.down('sm')]: {
    fontSize: 15,
  }
}));

const InfoDec = styled('div')(({ theme }) => ({
  fontSize: 30,
  fontFamily: "Montserrat",
  [theme.breakpoints.down('sm')]: {
    fontSize: 15,
  }
}));

const InfoWrapper = styled('div')(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "start",
  marginTop: 8,
  gap: 10,
  [theme.breakpoints.down('sm')]: {
    marginTop: 4,
  }
}));

const RightBox = styled('div')(({ theme }) => ({
  width: "65%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: 20,
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    paddingLeft: 0,
    height: "100%",
    marginTop: 20,
  }
}));

const page: React.FC<PageProps> = ({ params }) => {
  const [coinData, setCoinData] = useState<Coin>({} as Coin);
  const [loading, setLoading] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [flag,setflag] = useState(false);
  const [days, setDays] = useState("24h");
  const { currency, symbol } = cryptoState();
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMobileScreen = useMediaQuery('(max-width: 480px)');
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  useEffect(() => {
    const fetchSingleCoin = async () => {
      const option = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
        },
      };
      const responseCoinInfo = await fetch(SingleCoinApi(params.id), option); 
      const coinInfo = await responseCoinInfo.json();      
      const responsePriceHistory = await fetch(HistoricalChart(params.id, days), option);   // fetch data with respect to days 
      const priceHistory = await responsePriceHistory.json();
      setCoinData(coinInfo.data.coin);
      setChatData(priceHistory.data.history)
      setflag(true);
      setLoading(false)
    };
    fetchSingleCoin();
  }, [days]);
  const chartDays = [
    {
      label: "24 Hours",
      value: "24h",
    },
    {
      label: "30 Days",
      value: "30d",
    },
    {
      label: "3 Months",
      value: '3m',
    },
    {
      label: "1 Year",
      value: '1y',
    },
  ];
  return (
    <>
    {loading && <Loading/>}
    {!loading && <App>
      <Head />
      <ThemeProvider theme={darkTheme}>
        <Container>
          <LeftBox>
            <Image
              src={coinData.iconUrl}
              alt={coinData.symbol}
              priority
              width={isMobileScreen ? 100 :250}
              height={isMobileScreen ? 100 :250}
            />
            <Typography style={{ fontWeight: "bolder", fontSize:isMobileScreen ? 30 : 60 }}>
              {coinData.name}
            </Typography>
            <Typography style={{fontFamily:"Montserrat", fontSize:isMobileScreen ? 15 : 20}}>{coinData.description}</Typography>
            <InfoWrapper>
              <InfoTitle>Rank: </InfoTitle>
              <InfoDec>
                {coinData.rank}
              </InfoDec>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>
                Current Price:{" "}
              </InfoTitle>
              <InfoDec>
                {symbol + " " + parseFloat(coinData.price).toFixed(3)}
              </InfoDec>
            </InfoWrapper>
            <InfoWrapper>
              <InfoTitle>
                Market Cap:{" "}
              </InfoTitle>
              <InfoDec>{`${symbol} ${
                coinData.marketCap?.length >= 6
                  ? parseFloat(
                      coinData.marketCap.slice(0, 6)
                    ).toLocaleString() + " M"
                  : parseFloat(coinData.marketCap?.slice(0, 6)).toLocaleString()
              }`}</InfoDec>
            </InfoWrapper>
          </LeftBox>
          <RightBox>
        {!chatData || flag === false ? (

          <CircularProgress
            style={{ color: "gold" }}
            size={isSmallScreen ? 150 : 250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: chatData.map((coin) => {
                  let date = new Date(coin['timestamp']);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === '24h' ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: chatData.map((coin) => coin['price']),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
          </RightBox>
        </Container>
      </ThemeProvider>
    </App>}
    </>
  );
};

export default page;
