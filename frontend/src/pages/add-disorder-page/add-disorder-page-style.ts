import { ITextFieldStyles, mergeStyles } from "@fluentui/react";
import {  FONT_FAMILY, D_PURPLE, LL_PURPLE, WHITE_COLOR } from "../../constants";
export { };

export const addDisorderClassName = mergeStyles({
    backgroundColor: LL_PURPLE,
    backgroundImage: "url(./src/assets/background.png)",
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    width: "100%",
    height: "44vw",
    margin: "auto",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "500px",
    justifyContent: "space-evenly",
});

export const parenteditDisorderClassName = mergeStyles({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100vw",
})

export const inputcontainer = mergeStyles({
 position: "relative",
 margin: "5px 0",
 fontFamily: "arial",
})

export const inputStyle = mergeStyles({
    flex: 1,
    padding: '2px 1',
    fontSize: '16px',
    border: 'none',
    borderBottom: '2px solid #ccc',
    background: 'transparent',
    outline: 'none',
    transition: 'border-color 0.3s',
    selectors: {
      ':focus': {
        borderBottom: '2px solid #563C5C', // Change to your preferred color
      },
    },
    color: D_PURPLE
  });

export const addDisorderTitleClassName = mergeStyles({
    alignSelf: "center",
});

export const buttonsClassName = mergeStyles({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    alignSelf: 'center',
    marginTop: "5px"
});

export const addTitleInputStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        borderRadius: "25px",
        border: "none",
        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
        minHeight: "25px",
        margin: "1vh 0 1vh 0",
        selectors: {
            ".ms-TextField-fieldGroup": {
                border: "none",
            }
        }
    },
    root: {
        width: "100%",
        selectors: {
            ".ms-Label": {
                fontFamily: FONT_FAMILY,
            },
            ".ms-TextField-field": {
                fontFamily: FONT_FAMILY,
            }
        }
    },
    wrapper: {
        width: "50%"
    }
};


export const addInputClassName = mergeStyles({
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontFamily: FONT_FAMILY
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
    color: D_PURPLE,
    fontFamily: FONT_FAMILY
});