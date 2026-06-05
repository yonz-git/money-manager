import GlobalStyle from "../styles";
import BottomNav from "@/Components/BottomNav/BottomNav";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <BottomNav />
    </>
  );
}
