import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import TransactionForm from "../../../Components/TransactionsForm/TransactionsForm";
import {
  PageWrapper,
  Content,
  BackLink,
  
  BackgroundCanvas,
  FloatingAsset,
} from "../../../Components/Transactions/transactions.styles";

export default function EditTransactionPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: transaction,
    isLoading,
    error,
  } = useSWR(id ? `/api/transactions/${id}` : null);

  const { data: categoriesData } = useSWR("/api/category");
  const categoriesList = Array.isArray(categoriesData) ? categoriesData : [];

  async function handleSave(formData) {
    const response = await fetch(`/api/transactions/${id}`, {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push(`/transactions/${id}`);
    }
  }

  function handleCancel() {
    router.push(`/transactions/${id}`);
  }

  if (isLoading) {
    return (
      <PageWrapper>
        <Content>
          <p>Loading...</p>
        </Content>
      </PageWrapper>
    );
  }

  if (error || !transaction) {
    return (
      <PageWrapper>
        <Content>
          <p>Transaction not found.</p>
          <Link href="/">← Back to transactions</Link>
        </Content>
      </PageWrapper>
    );
  }

  return (
    <>
    <BackgroundCanvas>
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="5%" $size="170px" $duration="12s" $delay="1s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="25%" $size="170px" $duration="9s" $delay="12s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="45%" $size="170px" $duration="11s" $delay="4s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="65%" $size="170px" $duration="8s" $delay="8s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="85%" $size="170px" $duration="8s" $delay="10s" />
</BackgroundCanvas>
    <PageWrapper>
      <Content>
        <Link href={`/transactions/${id}`}>
          <BackLink>← Back</BackLink>
        </Link>
        <TransactionForm
        isOpen={true}
          onSaveTransaction={handleSave}
          onCancel={handleCancel}
          initialData={transaction}
          categoriesData={categoriesList}
        />
      </Content>
    </PageWrapper>
  </>
  );
}
