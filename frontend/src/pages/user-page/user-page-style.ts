import { ITextFieldStyles, mergeStyles } from "@fluentui/react";
import { BLACK_COLOR, D_PURPLE, FONT_FAMILY, LL_PURPLE, L_PURPLE, WHITE_COLOR } from "../../constants";

export const mainDivClassName = mergeStyles({
    width: "99.1vw",
    height: "45vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LL_PURPLE,
});

export const detailsAndPasswordDivClassName = mergeStyles({
    width: "45%",
    display: "flex",
    backgroundColor: LL_PURPLE,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: "10px",
    boxShadow: "0px 0px 7px 1px rgba(0,0,0,0.1)",
    overflowY: "auto",
    marginBottom: "5vh"
});

export const headerClassName = mergeStyles({
    margin: "5px",
    color: D_PURPLE
});

export const profileInputStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        borderRadius: "0", 
        border: "none",
        borderBottom: "2px solid #8B8589", 
        width: "13vw",
        height: "auto", 
        margin: "2vh 0",
        backgroundColor: "transparent", 
        transition: "border-color 0.3s ease", 
        selectors: {
            ":hover": {
                borderBottomColor: D_PURPLE, 
            },
            ":focus-within": {
                borderBottomColor: D_PURPLE, 
            },
        },
    },
    field: {
        backgroundColor: 'transparent',
        color: BLACK_COLOR,
        selectors: {
          ':disabled': {
            backgroundColor: '#transparent', // Change the background color when disabled
            color: L_PURPLE, // Change the text color when disabled
          },
        },
    },
};

export const detailsDivClassName = mergeStyles({
    width: "40%",
    display: "flex",
    flexDirection: "column",
});

export const passwordDivClassName = mergeStyles({
    width: "35%",
    display: "flex",
    flexDirection: "column",    
});

export const saveButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: D_PURPLE,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR
});

export const cancelButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: WHITE_COLOR,
    borderRadius: "25px",
    border: "1px solid " + D_PURPLE,
    fontFamily: FONT_FAMILY,
    color: D_PURPLE,
});

export const buttonsClassName = mergeStyles({
    alignSelf: "center",
    margin: "10px",
});

export const editButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: D_PURPLE,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR,
    alignSelf: "center",
    margin: "10px",
});

export const savePasswordButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: D_PURPLE,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR,
    alignSelf: "center",
    margin: "10px",
});