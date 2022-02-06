import { createTheme } from "@mui/material/styles";

// Override Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#7ebeab",
      contrastText: "#fff",
    },
    secondary: {
      main: "#9d9d9d",
      contrastText: "#fff",
    },
  },
});

export default theme;
