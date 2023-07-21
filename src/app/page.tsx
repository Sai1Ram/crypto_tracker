"use client"
import Head from "./head";
import { makeStyles } from "@material-ui/core/styles";
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
  const classes = useStyles()
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
