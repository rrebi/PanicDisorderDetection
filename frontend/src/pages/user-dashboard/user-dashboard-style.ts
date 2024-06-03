import { mergeStyles } from "@fluentui/react";
import { WHITE_COLOR } from "../../constants";

// Define the new color variables
export const D_GREEN = "#1E4D2B";
export const L_GREEN = "#B0C4A7";
export const D_PURPLE = "#563C5C";
export const L_PURPLE = "#8B8589";
export const LL_PURPLE = "#DBD7D2";

export const userDashboardMainDivClassName = mergeStyles({
    padding: "20px",
    backgroundColor: LL_PURPLE,
    minHeight: "100vh",
});

export const disorderDivClassName = mergeStyles({
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
});

export const disorderCardClassName = mergeStyles({
    width: "200px",
    cursor: "pointer",
    backgroundColor: L_GREEN,
    borderColor: D_GREEN,
    borderWidth: "2px",
    borderStyle: "solid",
    selectors: {
      ':hover': {
        backgroundColor: D_GREEN,
        color: "white",
      },
    },
});

export const disorderCardTitleClassName = mergeStyles({
    fontSize: "16px",
    fontWeight: "bold",
    color: D_PURPLE,
    padding: "10px",
});

export const disorderCardDetailsClassName = mergeStyles({
    padding: "10px",
    backgroundColor: LL_PURPLE,
});

export const disorderCardDetailsTextClassName = mergeStyles({
    fontSize: "14px",
    color: D_PURPLE,
});

export const addDisorderButtonClassName = mergeStyles({
    marginTop: "20px",
    backgroundColor: L_PURPLE,
    borderColor: D_PURPLE,
    borderWidth: "2px",
    borderStyle: "solid",
    selectors: {
      ':hover': {
        backgroundColor: D_PURPLE,
        color: "white",
      },
    },
});
