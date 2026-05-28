import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import TransactionsHeader from './TransactionsHeader';
import TransactionsControls from './TransactionsControls';
import TransactionsList from './TransactionsList';
import TransactionsSkeleton from './TransactionsSkeleton';
import TransactionsEmptyState from './TransactionsEmptyState';
import { PageWrapper, Content, FooterText } from './transactions.styles';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TransactionsPage() {
  
  const [sortBy, setSortBy] = useState('Newest');

   const { data, error, isLoading } = useSWR('/api/transactions', fetcher);

  const transactions = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : data.transactions || [];
  }, [data]);

  const sortedTransactions = useMemo(() => {
     if (!data) return [];
    let rawTransactions = Array.isArray(data) ? data : data.transactions || [];
    let sortedData = [...rawTransactions];

    // here implementing sorting logic based on current state
    if (sortBy === 'Newest') {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Oldest') {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'AmountHigh') {
      data.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'AmountLow') {
      data.sort((a, b) => a.amount - b.amount);
    }

    return data;
  }, [data, sortBy]);

  const showEmpty = !isLoading && sortedTransactions.length === 0;

  return (
    <PageWrapper>
      <TransactionsHeader />
      <Content>
       
        <TransactionsControls
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {loading ? (
          <TransactionsSkeleton />
        ) : showEmpty ? (
          <TransactionsEmptyState />
        ) : (
          <>
            <TransactionsList transactions={sortedTransactions} />
            
          </>
        )}
      </Content>
    </PageWrapper>
  );
}
