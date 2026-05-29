import { useState } from "react";
import useSWR from "swr";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsControls from "./TransactionsControls";
import TransactionsList from "./TransactionsList";
import TransactionsSkeleton from "./TransactionsSkeleton";
import TransactionsEmptyState from "./TransactionsEmptyState";
import TransactionForm from "../TransactionsForm/TransactionsForm";
import { PageWrapper, Content } from "./transactions.styles";

async function apiFetcher(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return response.json();
}

export default function TransactionsPage() {
  const [sortBy, setSortBy] = useState("Newest");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    data: cachedTransactionsPayload,
    error: transactionsError,
    isLoading: isTransactionsLoading,
    mutate: mutateTransactionsCache,
  } = useSWR("/api/transactions", apiFetcher);

  const { data: cachedCategoriesPayload } = useSWR("/api/category", apiFetcher);

  const transactionsList = cachedTransactionsPayload
    ? Array.isArray(cachedTransactionsPayload)
      ? cachedTransactionsPayload
      : cachedTransactionsPayload.transactions ?? []
    : [];

  const categoriesList = Array.isArray(cachedCategoriesPayload)
    ? cachedCategoriesPayload
    : [];

  function handleToggleForm() {
    setIsFormOpen(!isFormOpen);
  }

  function getSortedTransactions() {
    if (transactionsList.length === 0) return [];
    const transactionsClone = [...transactionsList];

    if (sortBy === "Newest") {
      transactionsClone.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sortBy === "Oldest") {
      transactionsClone.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortBy === "AmountHigh") {
      transactionsClone.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "AmountLow") {
      transactionsClone.sort((a, b) => a.amount - b.amount);
    }

    return transactionsClone;
  }

  const sortedTransactions = getSortedTransactions();
  const shouldShowEmptyState = !isTransactionsLoading && sortedTransactions.length === 0;

  async function handleAddTransaction(formData) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      mutateTransactionsCache();
      setIsFormOpen(false);
    }
  }

  return (
    <PageWrapper>
      <TransactionsHeader isFormOpen={isFormOpen} onToggleForm={handleToggleForm} />
      <Content>
        {isFormOpen && (
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <TransactionForm
              onAddTransaction={handleAddTransaction}
              categoriesData={categoriesList}
            />
          </div>
        )}

        <TransactionsControls sortBy={sortBy} setSortBy={setSortBy} />

        {transactionsError && <p>Could not load transactions. Please try again.</p>}

        {isTransactionsLoading ? (
          <TransactionsSkeleton />
        ) : shouldShowEmptyState ? (
          <TransactionsEmptyState />
        ) : (
          <TransactionsList transactions={sortedTransactions} />
        )}
      </Content>
    </PageWrapper>
  );
}
