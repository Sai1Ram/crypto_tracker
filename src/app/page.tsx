"use client"
import Head from "./head";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Banner from "./banner";
import CoinsTable from "./CoinsTable";
import { useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [flag, setFlag] = useState(false)
  setTimeout(()=>{setFlag(true)}, 1000)
  const useStyles = makeStyles(()=>(
    {App:{
      backgroundColor:"#14161a",
      minHeight:"100vh",
      color:"white",
      
    }}
  ))
  const theme = useTheme()
  const classes = useStyles(theme)
  return (
    <>
    {!flag && <Loading/>}
    {flag && <div
      className={classes.App}
      >
      <Head />
      <Banner/>
      <CoinsTable/>
    </div>}
      </>
  );
}
