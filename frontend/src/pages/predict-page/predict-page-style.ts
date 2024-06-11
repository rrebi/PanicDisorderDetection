import { mergeStyles } from "@fluentui/react";
import {  D_PURPLE, LL_PURPLE, WHITE_COLOR } from "../../constants";

export const predictPageClassName = mergeStyles({
    backgroundImage: "url(./src/assets/background.png)",
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    width: "100%",
    height: "100%",
    margin: "auto",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "600px",
    justifyContent: "space-evenly",
})

export const predictButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: D_PURPLE,
    borderRadius: "25px",
    border: "none",
    color: WHITE_COLOR,
})

export const predictPageClassNameSecond = mergeStyles({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100vw",
    marginBottom: "260px",
})

export const helpStepItemClassName = mergeStyles({
  marginBottom: "20px",
  display: "flex",
  justifyContent:"center",
  flexDirection:"column",
  alignItems:"center",
  padding: "20px",
  borderRadius: "10px",
  background: LL_PURPLE,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  selectors: {
    '&:hover': {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    '& h3': {
      margin: "10px 0",
      color: D_PURPLE,
    },
  },
});

export const GetHelpButtonClassName = mergeStyles({
  width: "150px",
  height: "40px",
  backgroundColor: WHITE_COLOR,
  borderRadius: "25px",
  border: "1px solid " + D_PURPLE,
  color: D_PURPLE,
})
