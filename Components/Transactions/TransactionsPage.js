import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import TransactionsHeader from './TransactionsHeader';
import TransactionsControls from './TransactionsControls';
import TransactionsList from './TransactionsList';
import TransactionsSkeleton from './TransactionsSkeleton';
import TransactionsEmptyState from './TransactionsEmptyState';
import AccountBalance from './AccountBalance'; 
import { PageWrapper, Content, FooterText } from './transactions.styles';

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch transaction stream.');
  return res.json();
});

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

    if (sortBy === 'Newest') {
      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Oldest') {
      sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'AmountHigh') {
      sortedData.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'AmountLow') {
      sortedData.sort((a, b) => a.amount - b.amount);
    }

    return sortedData;
  }, [data, sortBy]);

  const showEmpty = !isLoading && sortedTransactions.length === 0;


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
      <TransactionsHeader />
      <Content>
       
        <AccountBalance transactions={transactions} />

        <TransactionsControls 
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {isLoading ? (
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
