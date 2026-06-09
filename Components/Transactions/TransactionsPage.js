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
  ErrorContainer,
  ErrorTitle,
  ErrorText 
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

  const { data: transactionsData, error, isLoading, mutate } = useSWR("/api/transactions", fetcher);
  const { data: categoriesData } = useSWR("/api/category", fetcher);

  const transactionsList = transactionsData
    ? Array.isArray(transactionsData) ? transactionsData : (transactionsData.transactions ?? [])
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
      result = transactionsList.filter((t) => t.category === activeFilter);
    }
    if (activeTypeFilter && activeTypeFilter !== "All") {
      result = result.filter((t) => activeTypeFilter === "Income" ? t.amount > 0 : t.amount < 0);
    }
    const clone = [...result];
    if (sortBy === "Newest") clone.sort((a, b) => b.date.localeCompare(a.date));
    else if (sortBy === "Oldest") clone.sort((a, b) => a.date.localeCompare(b.date));
    else if (sortBy === "AmountHigh") clone.sort((a, b) => b.amount - a.amount);
    else if (sortBy === "AmountLow") clone.sort((a, b) => a.amount - b.amount);
    return clone;
  }

  const sortedTransactions = getSortedAndFilterTransactions();
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

 function handleEditTransaction(transaction) {
  setIsFormOpen(false); 
  setEditingTransaction(transaction);
}

  async function handleUpdateTransaction(formData) {
    const response = await fetch(`/api/transactions/${editingTransaction._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      mutate();
      setEditingTransaction(null);
    }
  }

  return (
    <PageWrapper>
      <TransactionsHeader isFormOpen={isFormOpen} onToggleForm={handleToggleForm} />
      <Content>
        {error && (
          <ErrorContainer>
            <ErrorTitle>Database Sync Error</ErrorTitle>
            
            <ErrorText>We are unable to load your accounts right now. Please try again later.</ErrorText>
          </ErrorContainer>
        )}

       
        <TransactionForm
  key="create-form" 
  isOpen={isFormOpen}
  onSaveTransaction={handleAddTransaction}
  categoriesData={categoriesList}
  onCancel={handleToggleForm}
/>

{editingTransaction && (
  <TransactionForm
    key={`edit-form-${editingTransaction._id}`} 
    isOpen={Boolean(editingTransaction)}
    onSaveTransaction={handleUpdateTransaction}
    categoriesData={categoriesList}
    initialData={editingTransaction}
    onCancel={() => setEditingTransaction(null)}
  />
)}
        <AccountBalance transactions={sortedTransactions} />
        <TransactionsControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          categoriesList={categoriesList}
          activeFilter={activeFilter}
          onApplyFilter={(cat) => setActiveFilter(cat)}
          onClearFilter={() => setActiveFilter(null)}
          activeTypeFilter={activeTypeFilter}
          onTypeFilterChange={(type) => setActiveTypeFilter(type)}
        />

        {isLoading ? (
          <TransactionsSkeleton />
        ) : shouldShowEmptyState ? (
          <TransactionsEmptyState isFiltered={activeFilter !== null || activeTypeFilter !== "All"} />
        ) : (
          <TransactionsList
            transactions={sortedTransactions}
            onDeleteSuccess={mutate}
            onEditTransaction={handleEditTransaction}
          />
        )}
      </Content>
    </PageWrapper>
  );
}
