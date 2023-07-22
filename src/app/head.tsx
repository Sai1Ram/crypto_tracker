"use client";
import {
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { CryptoState } from "./context/context";
const Title = styled("div")(({ theme }) => ({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  cursor: "pointer",
  fontWeight: "bold",
  padding: "0px 30px",
  [theme.breakpoints?.down("xs")]: {
    fontSize: "13px",
    fontWeight: "normal",
    padding: "0px 0px",
  },
}));
const Head = () => {
  const { currency, setCurrency } = CryptoState();
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
          <Link href={"/"}>
            <Title>CRYPTO TRACKER</Title>
          </Link>
          <div className="" style={{ flex: 1 , display: "flex", justifyContent: "end"}}>
            <Select
              variant="outlined"
              value={currency}
              // defaultValue={"INR"}
              style={{ marginLeft: 15, width: 100, height: 40 }}
              onChange={(e) => {
                setCurrency(e.target.value)
              }}
            >
              <MenuItem value={process.env.NEXT_PUBLIC_INR}>INR</MenuItem>
              <MenuItem value={process.env.NEXT_PUBLIC_USD}>USD</MenuItem>
            </Select>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Head;
