import { ReactNode } from "react";
import Header from "./Header";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../styles/theme";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="wrapper">
    <ThemeProvider theme={theme}>
      <Header />
      {children}
    </ThemeProvider>
  </div>
);

export default Layout;
