import React, { useEffect, useMemo, useState } from 'react';
import TransactionsHeader from './TransactionsHeader';
import TransactionsControls from './TransactionsControls';
import TransactionsList from './TransactionsList';
import TransactionsSkeleton from './TransactionsSkeleton';
import TransactionsEmptyState from './TransactionsEmptyState';
import { PageWrapper, Content, FooterText } from './transactions.styles';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/transactions', { cache: 'no-store' });
        const data = await res.json();
        setTransactions(Array.isArray(data) ? data : data.transactions || []);
      } catch (error) {
        console.error('Failed to load transactions:', error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const sortedTransactions = useMemo(() => {
    let data = Array.isArray(transactions) ? [...transactions] : [];

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
  }, [transactions, sortBy]);

  const showEmpty = !loading && sortedTransactions.length === 0;

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
