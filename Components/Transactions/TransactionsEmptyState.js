import React from 'react';
import { EmptyWrap, EmptyIcon, EmptyTitle, EmptyText } from './transactions.styles';

export default function TransactionsEmptyState() {
  return (
    <EmptyWrap>
      <EmptyIcon>🗂️</EmptyIcon>
      <EmptyTitle>No transactions found</EmptyTitle>
      <EmptyText>
        You don’t have any transactions yet.
        <br />
        Add transactions to get started.
      </EmptyText>
    </EmptyWrap>
  );
}