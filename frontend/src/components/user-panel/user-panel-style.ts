import { mergeStyles } from "@fluentui/react";
import { BACKGROUND_COLOR, BLACK_COLOR, D_PURPLE, FONT_FAMILY, WHITE_COLOR } from "../../constants";

export const userPanelClassName = mergeStyles({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
    fontFamily: FONT_FAMILY,
    color: BLACK_COLOR,
});

export const logoutButtonClassName = mergeStyles({
    backgroundColor: D_PURPLE,
    color: WHITE_COLOR,
    border: "none",
    borderRadius: "15px",
    width: "10vw"
});