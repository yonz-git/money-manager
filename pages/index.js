import { TransactionsPage } from "../Components/Transactions";
import {
  BackgroundCanvas,
  FloatingSquare,
} from "../Components/Transactions/transactions.styles";
export default function HomePage() {
  return (
    <>
      <BackgroundCanvas>
        <FloatingSquare
          color="rgba(34, 211, 238, 0.3)"
          size="120px"
          left="10%"
          duration="18s"
          delay="0s"
        />
        <FloatingSquare
          color="rgba(34, 197, 94, 0.3)"
          size="90px"
          left="40%"
          duration="14s"
          delay="3s"
        />
        <FloatingSquare
          color="rgba(239, 68, 68, 0.3)"
          size="60px"
          left="65%"
          duration="12s"
          delay="1s"
        />
        <FloatingSquare
          color="rgba(169, 85, 247, 0.45)"
          size="150px"
          left="80%"
          duration="22s"
          delay="5s"
        />
      </BackgroundCanvas>
      <TransactionsPage />
    </>
  );
}
