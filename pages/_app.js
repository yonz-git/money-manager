import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

async function fetcher(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network error");
    return response.json();
  } catch (error) {
    throw new Error("Failed to load data. Please try again.");
  }
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
