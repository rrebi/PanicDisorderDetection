import { mergeStyles } from "@fluentui/react";

import {  D_PURPLE, L_GREEN, D_GREEN, L_PURPLE, LL_PURPLE, WHITE_COLOR } from "../../constants";



export const userDashboardMainDivClassName = mergeStyles({
  backgroundImage: "url(./src/assets/background.png)",
  backgroundSize: "cover", 
  backgroundPosition: "center", 
  padding: "10px",
  backgroundColor: LL_PURPLE,
  minHeight: "100vh",
  width:"100vw"
});

export const disorderDivClassName = mergeStyles({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
});

export const disorderCardClassName = mergeStyles({
  width: "calc(33.33% - 20px)", 
  marginBottom: "20px",
  cursor: "pointer",
  backgroundColor: L_GREEN,
  borderColor: D_GREEN,
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s, color 0.3s, transform 0.3s",
  selectors: {
    ':hover': {
      backgroundColor: D_GREEN,
      color: WHITE_COLOR,
      transform: "translateY(-5px)", 
    },
  },
});

export const disorderCardTitleClassName = mergeStyles({
  fontSize: "16px",
  fontWeight: "bold",
  color: L_PURPLE,
  padding: "10px",
});

export const disorderCardDetailsClassName = mergeStyles({
  padding: "10px",
  backgroundColor: L_GREEN,
  borderRadius: "0 0 8px 8px",
});

export const disorderCardDetailsTextClassName = mergeStyles({
  fontSize: "14px",
  color: D_PURPLE,
});

export const ClassMoveButtons = mergeStyles({
marginLeft:"5%",
});



export const addDisorderButtonClassName = mergeStyles({
  marginTop: "20px",
  marginBottom: "20px",
  backgroundColor: L_PURPLE,
  borderColor: D_PURPLE,
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "8px",
  padding: "10px 20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s, color 0.3s, transform 0.3s",
  selectors: {
    ':hover': {
      backgroundColor: D_PURPLE,
      color: WHITE_COLOR,
      transform: "translateY(-5px)", 
    },
  },
});

