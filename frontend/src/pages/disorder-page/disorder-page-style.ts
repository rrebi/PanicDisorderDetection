import { IDialogStyles, ITextFieldStyles, mergeStyles } from "@fluentui/react";
import { D_PURPLE, FONT_FAMILY, WHITE_COLOR } from "../../constants";


export const parenteditDisorderClassName = mergeStyles({
    backgroundImage: "url(./src/assets/background.png)",
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "99.1vw",
})

export const viewDisorderClassName = mergeStyles({
    width: "100%",
    height: "85%",
    margin: "auto",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    verticalAlign: "middle",
    alignItems: "center",
    minHeight: "500px",
    justifyContent: "space-evenly"
});

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
        borderBottom: '2px solid #563C5C',
      },
    },
    color:D_PURPLE
    
  });



export const editDisorderClassName = mergeStyles({
    width: "100%",
    height: "44vw",
    margin: "auto",
    alignItems: "center",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    minHeight: "500px",
    justifyContent: "space-evenly"
});

export const buttonsClassName = mergeStyles({
    display: "flex",
    flexDirection: "row",
    marginBottom: "15px",
    justifyContent: "space-evenly",
    width: "30%"
});

export const editButtonsClassName = mergeStyles({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "25%",
    alignSelf: "center"
});

export const editButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: D_PURPLE,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR,
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

export const deleteButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: WHITE_COLOR,
    borderRadius: "25px",
    border: "1px solid " + D_PURPLE,
    fontFamily: FONT_FAMILY,
    color: D_PURPLE
});

export const cancelButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: WHITE_COLOR,
    borderRadius: "25px",
    border: "1px solid " + D_PURPLE,
    fontFamily: FONT_FAMILY,
    color: D_PURPLE
});

export const editEntryInputStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        borderRadius: "25px",
        border: "none",
        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
        minHeight:"25px",
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
        width:"50%"
    }
};

export const editInputClassName = mergeStyles({
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontFamily: FONT_FAMILY
});

export const confirmationsClassName = mergeStyles({
    fontFamily: FONT_FAMILY,
});

export const cofirmationStyle: Partial<IDialogStyles> = {
    root: {
        selectors: {
            ".ms-Dialog-title": {
                fontFamily: FONT_FAMILY,
                marginTop: "10px",
            },
            ".ms-Dialog-subText": {
                fontFamily: FONT_FAMILY,
            }
        }
    },
    main: {
        borderRadius: "10px",
    }
};

export const confirmationDeleteButtonClassName = mergeStyles({
    backgroundColor: D_PURPLE,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR
});

export const confirmationCancelButtonClassName = mergeStyles({
    backgroundColor: WHITE_COLOR,
    borderRadius: "25px",
    border: "1px solid " + D_PURPLE,
    fontFamily: FONT_FAMILY,
    color: D_PURPLE
});