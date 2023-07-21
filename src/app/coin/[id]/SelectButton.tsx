'use client'
import { useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {MouseEventHandler} from 'react'

interface btnProps  {
children:string;
selected:boolean;
onClick: MouseEventHandler<HTMLSpanElement>
}
const SelectButton:React.FC<btnProps> = ({ children, selected, onClick }) => {
  const useStyles = makeStyles((theme: any)=>({
    selectbutton: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
      //   margin: 5,
      [theme.breakpoints?.down("sm")]:{
        padding: 5,
        fontWeight: 300,
        width: "100%",
        fontSize: 10,
        marginRight: 3,
        borderRadius: 3,
      }
    },
  }));
const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;