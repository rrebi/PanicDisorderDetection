import { mergeStyles } from "@fluentui/react";
import { BACKGROUND_COLOR } from "../../constants";

export const logoStyle = mergeStyles({
    width: "12em",
    marginLeft: "2em",
    marginTop: "0.5em"
});

export const pageStyle = mergeStyles({
    backgroundColor: BACKGROUND_COLOR,
    height: "100vh",
    width: "100vw",
});

