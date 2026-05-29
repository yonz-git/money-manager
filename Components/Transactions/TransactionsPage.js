import { useState } from "react";
import useSWR from "swr";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsControls from "./TransactionsControls";
import TransactionsList from "./TransactionsList";
import TransactionsSkeleton from "./TransactionsSkeleton";
import TransactionsEmptyState from "./TransactionsEmptyState";
import TransactionForm from "../TransactionsForm/TransactionsForm";
import { PageWrapper, Content, FormWrapper } from "./transactions.styles";

async function fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return response.json();
}

export default function TransactionsPage() {
  const [sortBy, setSortBy] = useState("Newest");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    data: transactionsData,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/transactions", fetcher);

  const { data: categoriesData } = useSWR("/api/category", fetcher);

  const transactionsList = transactionsData
    ? Array.isArray(transactionsData)
      ? transactionsData
      : transactionsData.transactions ?? []
    : [];

  const categoriesList = Array.isArray(categoriesData)
    ? categoriesData
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
  const shouldShowEmptyState = !isLoading && sortedTransactions.length === 0;

  async function handleAddTransaction(formData) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      mutate();
      setIsFormOpen(false);
    }
  }


  if (error) {
    return (
      <PageWrapper>
        <Content>
          <div className="p-4 my-6 bg-red-50 border border-red-200 rounded-lg text-center">
            <h2 className="text-red-800 font-semibold mb-1">Database Sync Error</h2>
            <p className="text-sm text-red-600">
              We are unable to load your accounts right now. Please try again later.
            </p>
          </div>
        </Content>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <TransactionsHeader isFormOpen={isFormOpen} onToggleForm={handleToggleForm} />
      <Content>
        {isFormOpen && (
          <FormWrapper>
            <TransactionForm
              onAddTransaction={handleAddTransaction}
              categoriesData={categoriesList}
            />
          </FormWrapper>
        )}

        <TransactionsControls sortBy={sortBy} setSortBy={setSortBy} />

        {error && <p>Could not load transactions. Please try again.</p>}

        {isLoading ? (
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