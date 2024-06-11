import { mergeStyles } from "@fluentui/react";
import {  D_PURPLE, LL_PURPLE } from "../../constants";

export const disorderHelpPageClassName = mergeStyles({
  backgroundImage: "url(./src/assets/background.png)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "auto",
  height: "100%",
  margin: "auto",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  overflow: "auto",
});

export const helpStepClassName = mergeStyles({
  listStyleType: "none",
  padding: 0,
  width: "100%",
  maxWidth: "50%",
  maxHeight: "20%",
  whiteSpace: "normal",
});

export const helpStepItemClassName = mergeStyles({
    marginBottom: "20px",
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

