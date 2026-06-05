import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

async function fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return response.json();
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
