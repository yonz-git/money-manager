import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

async function fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.status = response.status;

    try {
      error.info = await response.json();
    } catch {
      error.info = null;
    }
    throw error;
  }
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
