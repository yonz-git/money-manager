import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import TransactionForm from "../../../Components/TransactionsForm/TransactionsForm";
import {
  PageWrapper,
  Content,
  BackLink,
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
    <PageWrapper>
      <Content>
        <Link href={`/transactions/${id}`}>
          <BackLink>← Back</BackLink>
        </Link>
        <TransactionForm
          onSaveTransaction={handleSave}
          onCancel={handleCancel}
          initialData={transaction}
          categoriesData={categoriesList}
        />
      </Content>
    </PageWrapper>
  );
}
