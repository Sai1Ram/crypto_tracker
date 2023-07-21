"use client";
import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  makeStyles,
  Container,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  useMediaQuery,
  LinearProgress,
} from "@material-ui/core";
import { Coins } from "@/config/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cryptoState } from "./context/context";
import { Pagination, PaginationItem } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  title: {
    color: "White",
    fontFamily: "Montserrat",
    cursor: "pointer",
    textAlign: "center",
    padding: 8,
    fontSize: "1.5rem",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
  },

  name: {
    color: "white",
    fontFamily: "Montserrat",
  },
  paginationStyle: {
    display: "flex",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
  colorPrimary: {
    backgroundColor: "gold",
  },
}));
const CoinsTable = () => {
  const { symbol } = cryptoState();
  const [coinsList, setCoinsList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();
  interface Coin {
    name: string;
    symbol: string;
    price: string;
    uuid: string;
    iconUrl: string;
    change: string;
    marketCap: string;
  }
  const classes = useStyles();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  useEffect(() => {
    setLoading(true);
    const fetchAllCoins = async () => {
      const url = Coins();
      const option = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
        },
      };
      const response = await fetch(url, option);
      const data = await response.json();
      setCoinsList(data.data.coins);
      setLoading(false);
    };
    fetchAllCoins();
  }, []);
  const isMobileScreen = useMediaQuery("(max-width: 480px)");

  const tableHead = ["Coins", "Price", "24H Change", "Market Cap"];
  const handleSearch = () => {
    return coinsList.filter((coin: Coin) => {
      return (
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    });
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Typography className={classes.title}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label={"Search For a Crypto Currency"}
          variant={"outlined"}
          style={{ width: "100%", marginBottom: 20 }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        ></TextField>
        {loading && (
          <LinearProgress
            classes={{
              colorPrimary: classes.colorPrimary,
            }}
          />
        )}
        {!loading && (
          <TableContainer
            style={{ borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
          >
            <Table>
              <TableHead style={{ backgroundColor: "gold" }}>
                <TableRow>
                  {tableHead.map((head, index) => (
                    <TableCell
                      align={head === "Coins" ? "left" : "center"}
                      style={{
                        fontSize: isMobileScreen ? 16 : 22,
                        color: "black",
                        fontFamily: "Montserrat",
                      }}
                      key={head + index}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((coin: Coin, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={coin.uuid}
                        onClick={() => router.push(`coin/${coin.uuid}`)}
                      >
                        <TableCell align="center">
                          <div style={{ display: "flex", gap: 8 }}>
                            <Image
                              src={coin.iconUrl}
                              alt={coin.symbol}
                              width={50}
                              height={50}
                            />
                            <div className={classes.wrapper}>
                              <Typography
                                className={classes.name}
                                style={{ fontSize: isMobileScreen ? 14 : 22 }}
                              >
                                {coin.symbol}
                              </Typography>
                              <Typography
                                className={classes.name}
                                style={{ fontSize: isMobileScreen ? 12 : 16 }}
                              >
                                {coin.name}
                              </Typography>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            className={classes.name}
                            style={{ fontSize: isMobileScreen ? 14 : 22 }}
                          >
                            {`${symbol} ${parseFloat(coin.price).toFixed(3)}`}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            className={classes.name}
                            style={{ fontSize: 22 }}
                          >
                            {parseFloat(coin.change) >= 0 ? (
                              <Typography style={{ color: "green" }} component={"span"}>
                                +{coin.change}%
                              </Typography>
                            ) : (
                              <Typography style={{ color: "red" }} component={"span"}>
                                {coin.change}%
                              </Typography>
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            className={classes.name}
                            style={{ fontSize: isMobileScreen ? 14 : 22 }}
                          >
                            {`${symbol} ${
                              coin.marketCap.length >= 6
                                ? parseFloat(
                                    coin.marketCap.slice(0, 6)
                                  ).toLocaleString() + " M"
                                : parseFloat(
                                    coin.marketCap.slice(0, 6)
                                  ).toLocaleString()
                            }`}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Pagination
          variant="outlined"
          color="standard"
          count={handleSearch()?.length / 10}
          onChange={(_, value) => {
            setPage(value - 1);
            window.scroll(0, 450);
          }}
          classes={{ ul: classes.paginationStyle }}
        ></Pagination>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
