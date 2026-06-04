import { useState } from "react";
import useSWR from "swr";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsControls from "./TransactionsControls";
import TransactionsList from "./TransactionsList";
import TransactionsSkeleton from "./TransactionsSkeleton";
import TransactionsEmptyState from "./TransactionsEmptyState";
import TransactionForm from "../TransactionsForm/TransactionsForm";
import AccountBalance from "./AccountBalance";
import {
  PageWrapper,
  Content,
  FormWrapper,
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
} from "./transactions.styles";

async function fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return response.json();
}

export default function TransactionsPage() {
  const [sortBy, setSortBy] = useState("Newest");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeTypeFilter, setActiveTypeFilter] = useState("All");

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
      : (transactionsData.transactions ?? [])
    : [];

  const categoriesList = Array.isArray(categoriesData) ? categoriesData : [];

  function handleToggleForm() {
    setIsFormOpen(!isFormOpen);
    setEditingTransaction(null);
  }

  function getSortedAndFilterTransactions() {
    if (transactionsList.length === 0) return [];

    let result = transactionsList;
    if (activeFilter) {
      result = transactionsList.filter(
        (transaction) => transaction.category === activeFilter
      );
    }

    if (activeTypeFilter && activeTypeFilter !== "All") {
      result = result.filter((transaction) => {
        activeTypeFilter === "Income"
          ? transaction.amount > 0
          : transaction.amount < 0;
      });
    }

    const transactionsClone = [...result];

    if (sortBy === "Newest") {
      transactionsClone.sort(function (a, b) {
        return b.date.localeCompare(a.date);
      });
    } else if (sortBy === "Oldest") {
      transactionsClone.sort(function (a, b) {
        return a.date.localeCompare(b.date);
      });
    } else if (sortBy === "AmountHigh") {
      transactionsClone.sort(function (a, b) {
        return b.amount - a.amount;
      });
    } else if (sortBy === "AmountLow") {
      transactionsClone.sort(function (a, b) {
        return a.amount - b.amount;
      });
    }

    return transactionsClone;
  }

  const sortedTransactions = getSortedAndFilterTransactions();
  const shouldShowEmptyState = !isLoading && sortedTransactions.length === 0;

  function handleApplyFilter(category) {
    setActiveFilter(category);
  }

  function handleApplyTypeFilter(type) {
    setActiveTypeFilter(type);
  }

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

  function handleEditTransaction(transaction) {
    setEditingTransaction(transaction);
    setIsFormOpen(false);
  }

  function handleCancelEdit() {
    setEditingTransaction(null);
  }

  async function handleUpdateTransaction(formData) {
    const response = await fetch(
      `/api/transactions/${editingTransaction._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      mutate();
      // close the edit form after successful save
      setEditingTransaction(null);
    }
  }

  return (
    <PageWrapper>
      <TransactionsHeader
        isFormOpen={isFormOpen}
        onToggleForm={handleToggleForm}
      />
      <Content>
        {error && (
          <ErrorContainer>
            <ErrorTitle>Database Sync Error</ErrorTitle>
            <ErrorMessage>
              We are unable to load your accounts right now. Please try again
              later.
            </ErrorMessage>
          </ErrorContainer>
        )}

        {isFormOpen && (
          <FormWrapper>
            <TransactionForm
              onSaveTransaction={handleAddTransaction}
              categoriesData={categoriesList}
            />
          </FormWrapper>
        )}

        {editingTransaction && (
          <TransactionForm
            onSaveTransaction={handleUpdateTransaction}
            categoriesData={categoriesList}
            initialData={editingTransaction}
            onCancel={handleCancelEdit}
          />
        )}
        <AccountBalance transactions={sortedTransactions} />
        <TransactionsControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          categoriesList={categoriesList}
          activeFilter={activeFilter}
          onApplyFilter={handleApplyFilter}
          onClearFilter={() => setActiveFilter(null)}
          activeTypeFilter={activeTypeFilter}
          onTypeFilterChange={handleApplyTypeFilter}
        />

        {isLoading ? (
          <TransactionsSkeleton />
        ) : shouldShowEmptyState ? (
          <TransactionsEmptyState
            isFiltered={activeFilter !== null || activeTypeFilter !== "All"}
          />
        ) : (
          <TransactionsList transactions={sortedTransactions} />
        )}
      </Content>
    </PageWrapper>
  );
}
