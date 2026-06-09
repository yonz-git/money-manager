import { TransactionsPage } from "../Components/Transactions";
import {
  BackgroundCanvas,
  FloatingAsset,
} from "../Components/Transactions/transactions.styles";

export default function HomePage() {
  return (
    <>
      <BackgroundCanvas>
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="5%" $size="170px" $duration="12s" $delay="1s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="25%" $size="170px" $duration="9s" $delay="12s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="45%" $size="170px" $duration="11s" $delay="4s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="65%" $size="170px" $duration="8s" $delay="8s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="85%" $size="170px" $duration="8s" $delay="10s" />
</BackgroundCanvas>
      <TransactionsPage />
    </>
  );
}
