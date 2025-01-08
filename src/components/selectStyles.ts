const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
      maxWidth: 300,
      border: "2px solid #371a45",
      borderRadius: "10px",
    },
  },
  anchorOrigin: {
    vertical: 50,
    horizontal: 0,
  },
  transformOrigin: {
    vertical: 0,
    horizontal: 0,
  },
  sx: {
    "& .MuiMenu-list": {
      marginTop: 0,
      paddingTop: 0,
    },
    "& .MuiMenuItem-root": {
      padding: "0px",
      display: "flex",
      height: "32px",
    },

    "& .MuiMenuItem-root .MuiTypography-root": {
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0.0025em",
    },

    "& .MuiMenuItem-root:hover": {
      backgroundColor: " #371a45",
      color: "#fff",
      "& .MuiCheckbox-root": {
        color: "white",
      },
    },
    "& .MuiMenuItem-root.Mui-selected": {
      backgroundColor: "#fcaf23",
      color: "#fff",
      "& .MuiCheckbox-root": {
        color: "white",
      },
    },
    "& .MuiMenuItem-root.Mui-selected:hover": {
      backgroundColor: "#371a45",
      color: "white",
    },
    "& .MuiCheckbox-root": {
      height: "8px",
    },
  },
};

export const selectedStyles = {
  cursor: "pointer",
  backgroundColor: "rgba(255, 255, 255, 0.84)",
  borderRadius: "10px",
  outline: "none",
  fontSize: "14px",
  letterSpacing: "0.0025em",
  "&:hover": {
    outline: "none",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
  "&:active": {
    outline: "none",
    boxShadow: "none",
  },

  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#black",
    borderWidth: "2px",
  },
};
