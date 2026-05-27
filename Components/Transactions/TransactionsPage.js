import React, { useEffect, useMemo, useState } from 'react';
import TransactionsHeader from './TransactionsHeader';
import TransactionsSearchBar from './TransactionsSearchBar';
import TransactionsControls from './TransactionsControls';
import TransactionsList from './TransactionsList';
import TransactionsSkeleton from './TransactionsSkeleton';
import TransactionsEmptyState from './TransactionsEmptyState';
import { PageWrapper, Content, FooterText } from './transactions.styles';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
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

  const filteredTransactions = useMemo(() => {
    let data = Array.isArray(transactions) ? [...transactions] : [];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (tx) =>
          tx.title?.toLowerCase().includes(q) ||
          tx.category?.toLowerCase().includes(q)
      );
    }

    if (filterType !== 'All') {
      data = data.filter((tx) =>
        filterType === 'Income' ? tx.amount >= 0 : tx.amount < 0
      );
    }

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
  }, [transactions, search, filterType, sortBy]);

  const showEmpty = !loading && filteredTransactions.length === 0;

  return (
    <PageWrapper>
      <TransactionsHeader />
      <Content>
        <TransactionsSearchBar search={search} setSearch={setSearch} />
        <TransactionsControls
          filterType={filterType}
          setFilterType={setFilterType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {loading ? (
          <TransactionsSkeleton />
        ) : showEmpty ? (
          <TransactionsEmptyState />
        ) : (
          <>
            <TransactionsList transactions={filteredTransactions} />
            <FooterText>
              {filterType === 'All' && search.trim() === ''
                ? 'Pull up to load more'
                : 'No more transactions'}
            </FooterText>
          </>
        )}
      </Content>
    </PageWrapper>
  );
}