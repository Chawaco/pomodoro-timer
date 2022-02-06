import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
import Timer from "./components/Timer";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { SettingProvider } from "./providers/SettingProvider";

import "react-circular-progressbar/dist/styles.css";
import "./styles/styles.scss";

const nonce = document.head
  .querySelector("[property~=csp-nonce][content]")
  ?.getAttribute("content") as string;
const cache = createCache({
  key: "my-prefix-key",
  prepend: true,
  nonce,
});

const App: React.FC = (): ReactElement => {
  return (
    <SettingProvider>
      <CacheProvider value={cache}>
        <Layout>
          <Timer />
        </Layout>
      </CacheProvider>
    </SettingProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
