'use client'
import React,{ ReactNode, createContext, useContext, useEffect, useState } from "react";
interface CryptoContextProps {
  setCurrency: (currency: string) => void;
  setSymbol: (symbol: string) => void;
  symbol: string;
  currency: string;
}
const Crypto = createContext<CryptoContextProps>({
  setCurrency: () => {},
  setSymbol: () => {},
  symbol: "",
  currency: "",
});

const Context = ({children}: { children: ReactNode }) => {
    const [symbol, setSymbol] = useState("$");
    const [currency, setCurrency] = useState(process.env.NEXT_PUBLIC_USD as string);
    useEffect(()=>{
        if(currency === process.env.NEXT_PUBLIC_INR) setSymbol("₹");
        if(currency === process.env.NEXT_PUBLIC_USD) setSymbol("$");
    }, [currency])
  return (
    <Crypto.Provider value={{setSymbol, symbol, currency, setCurrency}}>
        {children}
    </Crypto.Provider>
  )
}

export default Context

export const CryptoState = () =>{
    return useContext(Crypto);
}
