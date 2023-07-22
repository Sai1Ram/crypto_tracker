"use client";
import {
  AppBar,
  Typography,
  Toolbar,
  Select,
  MenuItem,
  ThemeProvider,
  createTheme,
  styled
} from "@mui/material";
import Link from "next/link";
import React from "react";
import {cryptoState} from "./context/context"
const Title = styled('div')(({ theme }) => ({
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    cursor: "pointer",
    fontWeight: "bold",
    padding:"0px 30px",
    [theme.breakpoints?.down('xs')]:{
      fontSize:"13px",
      fontWeight: "normal",
      padding:"0px 0px",
    }
}));
const Head = () => {
  const {currency, setCurrency} = cryptoState();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
          <Toolbar>
            <Link href={"/"} style={{flex:1}}>
              <Title>CRYPTO TRACKER</Title>
            </Link>
            <Select
              variant="outlined"
              value={currency}
              defaultValue={"INR"}
              style={{ marginLeft: 15, width: 100, height: 40}}
              onChange={(e)=>{
                setCurrency(e.target.value as string);                             
              }}
            >
              <MenuItem value={`INR`}>INR</MenuItem>
              <MenuItem value={`USD`}>USD</MenuItem>
            </Select>
          </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Head;
