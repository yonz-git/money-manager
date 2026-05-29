import React, { useMemo, useState, useCallback } from 'react';
import useSWR from 'swr';
import TransactionsHeader from './TransactionsHeader';
import TransactionsControls from './TransactionsControls';
import TransactionsList from './TransactionsList';
import TransactionsSkeleton from './TransactionsSkeleton';
import TransactionsEmptyState from './TransactionsEmptyState';
import TransactionForm from '../TransactionsForm/TransactionsForm';
import { PageWrapper, Content } from './transactions.styles';

const apiFetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network error');
  return response.json();
};

const createTemporaryTransaction = (formData) => ({
  _id: `temp-${Date.now()}`,
  ...formData,
});

const getOptimisticState = (currentCache, temporaryTransaction) => {
  if (Array.isArray(currentCache)) {
    return [temporaryTransaction, ...currentCache];
  }
  return {
    ...currentCache,
    transactions: [temporaryTransaction, ...(currentCache?.transactions ?? [])],
  };
};

const getFinalizedCacheState = (savedTransaction, currentCache, temporaryId) => {
  const removeTemporaryItem = (list) => 
    list.filter((transaction) => transaction._id !== temporaryId);

  if (Array.isArray(currentCache)) {
    return [savedTransaction, ...removeTemporaryItem(currentCache)];
  }
  return {
    ...currentCache,
    transactions: [savedTransaction, ...removeTemporaryItem(currentCache.transactions ?? [])],
  };
};

export default function TransactionsPage() {
  const [sortBy, setSortBy] = useState('Newest');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { 
    data: cachedTransactionsPayload, 
    isLoading: isTransactionsLoading, 
    mutate: mutateTransactionsCache 
  } = useSWR('/api/transactions', apiFetcher, { onError: () => {} });

  const { 
    data: cachedCategoriesPayload 
  } = useSWR('/api/category', apiFetcher, { onError: () => {} });

  const transactionsList = useMemo(() => {
    if (!cachedTransactionsPayload) return [];
    return Array.isArray(cachedTransactionsPayload) 
      ? cachedTransactionsPayload 
      : cachedTransactionsPayload.transactions ?? [];
  }, [cachedTransactionsPayload]);

  const categoriesList = useMemo(() => {
    return Array.isArray(cachedCategoriesPayload) ? cachedCategoriesPayload : [];
  }, [cachedCategoriesPayload]);

  const sortedTransactions = useMemo(() => {
    if (transactionsList.length === 0) return [];
    const transactionsClone = [...transactionsList];

    if (sortBy === 'Newest') {
      transactionsClone.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sortBy === 'Oldest') {
      transactionsClone.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortBy === 'AmountHigh') {
      transactionsClone.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'AmountLow') {
      transactionsClone.sort((a, b) => a.amount - b.amount);
    }

    return transactionsClone;
  }, [transactionsList, sortBy]);

  const handleAddTransaction = useCallback(async (formData) => {
    const temporaryTransaction = createTemporaryTransaction(formData);

    const updateCacheWithServerResponse = (savedTransaction, currentCache) => {
      return getFinalizedCacheState(savedTransaction, currentCache, temporaryTransaction._id);
    };

    setIsFormOpen(false);

    try {
      await mutateTransactionsCache(
        fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }).then((response) => {
          if (!response.ok) throw new Error('Database error saving transaction.');
          return response.json();
        }),
        {
          optimisticData: getOptimisticState(cachedTransactionsPayload, temporaryTransaction),
          populateCache: updateCacheWithServerResponse,
          rollbackOnError: true,
          revalidate: false,
        }
      );
    } catch (error) {
      console.error('Network error saving transaction:', error);
      alert('Failed to submit transaction. UI state rolled back.');
    }
  }, [cachedTransactionsPayload, mutateTransactionsCache]);

  const shouldShowEmptyState = !isTransactionsLoading && sortedTransactions.length === 0;

  return (
    <PageWrapper>
      <TransactionsHeader
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
      />
      <Content>
        {isFormOpen && (
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <TransactionForm
             onAddTransaction={handleAddTransaction} 
             categoriesData={categoriesList}
            />
          </div>
        )}

        <TransactionsControls sortBy={sortBy} setSortBy={setSortBy} />

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
