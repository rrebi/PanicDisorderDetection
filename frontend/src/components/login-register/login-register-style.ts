import { ILabelStyles, ITextFieldStyles, mergeStyles } from "@fluentui/react";
import { D_PURPLE, FONT_FAMILY, LL_PURPLE, WHITE_COLOR } from "../../constants";

export const loginRegisterClassName = mergeStyles({
    backgroundColor: LL_PURPLE,
    backgroundImage: "url(./src/assets/background.png)",
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    width: "auto",
    height: "75%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "500px",
});

export const registerContainerClassName = mergeStyles({
    backgroundColor: LL_PURPLE,
    backgroundImage: "url(./src/assets/background.png)",
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    width: "100%",
    height: "75%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
    minHeight: "500px",
});

export const loginIconClassName = mergeStyles({
    width: "10%",  // Adjusted size
    marginBottom: "10px",  // Added margin for spacing
});

export const registerIconClassName = mergeStyles({
    width: "5%",
    backgroundColor: "rgba(0, 0, 0, 0)",
});

export const loginFormClassName = mergeStyles({
    display: "flex",
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
});

export const registerFormClassName = mergeStyles({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
});

export const loginRegisterFormClassName = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: "1.4em",
    fontWeight: "bold", 
    letterSpacing: "0.5px",
    marginBottom: "3px"
});

export const LoginRegisterLabelStyle: Partial<ILabelStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
    },
};

export const LoginInputStyle: Partial<ITextFieldStyles> = {
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
            }
        }
    },
    root: {
        selectors: {
            ".ms-TextField-field": {
                fontFamily: FONT_FAMILY,
                fontSize: "1.1em",
                padding: "10px 0", 
                color: "#333", 
                backgroundColor: "transparent", 
                border: "none", 
                outline: "none", 
            }
        }
    }
};


export const RegisiterInputStyle: Partial<ITextFieldStyles> = {
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
                borderBottomColor: "#563C5C", 
            },
            ":focus-within": {
                borderBottomColor: "#563C5C", 
            }
        }
    },
    root: {
        selectors: {
            ".ms-TextField-field": {
                fontFamily: FONT_FAMILY,
                fontSize: "1.1em",
                padding: "10px 0", 
                color: "#333", 
                backgroundColor: "transparent", 
                border: "none", 
                outline: "none", 
            }
        }
    }
};

export const loginRegisterButtonClassName = mergeStyles({
    width: "7vw",
    height: "5vh",
    minHeight:"25px",
    margin: "1vh 0 1vh 0",
    borderRadius: "25px",
    border: "none",
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
    backgroundColor: "#8B8589",
    color: WHITE_COLOR 
});

export const signUpActionButtonClassName = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: "1em",
});

export const registerColumnClassName = mergeStyles({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1vw', // Adds space between the buttons
    marginTop: '2vh', // Adds space above the buttons
});


export const choiceGroupClassName = mergeStyles({
    fontFamily: FONT_FAMILY,
});

export const optionContainerClassName = mergeStyles({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontFamily: FONT_FAMILY,
  });
