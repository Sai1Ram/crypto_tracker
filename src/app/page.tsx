"use client";
import Head from "./head";
import { styled, useTheme } from "@mui/material/styles";
import Banner from "./banner";
import CoinsTable from "./CoinsTable";
import { useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [flag, setFlag] = useState(false);
  setTimeout(() => {
    setFlag(true);
  }, 1000);
  const App = styled("div")(({ theme }) => ({
    backgroundColor: "#14161a",
    minHeight: "100vh",
    color: "white",
  }));
  return (
    <>
      {!flag && <Loading />}
      {flag && (
        <App>
          <Head />
          <Banner />
          <CoinsTable />
        </App>
      )}
    </>
  );
}
