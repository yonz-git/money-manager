import { TransactionsPage } from "../Components/Transactions";
import {
  BackgroundCanvas,
  FloatingAsset,
} from "../Components/Transactions/transactions.styles";

export default function HomePage() {
  return (
    <>
      <BackgroundCanvas>
         <FloatingAsset src="/piggy-coin.png" alt="" $left="5%" $size="170px" $duration="12s" $delay="1s" />
         <FloatingAsset src="/piggy-coin.png" alt="" $left="25%" $size="170px" $duration="9s" $delay="12s" />
         <FloatingAsset src="/piggy-coin.png" alt="" $left="45%" $size="170px" $duration="11s" $delay="4s" />
         <FloatingAsset src="/piggy-coin.png" alt="" $left="65%" $size="170px" $duration="8s" $delay="8s" />
      </BackgroundCanvas>
      <TransactionsPage />
    </>
  );
}
