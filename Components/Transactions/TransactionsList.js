import React from 'react';
import TransactionCard from './TransactionCard';
import { ListWrapper } from './transactions.styles';

export default function TransactionsList({ transactions }) {
  return (
    <ListWrapper>
      {transactions.map((tx) => (
        <TransactionCard key={tx._id} transaction={tx} />
      ))}
    </ListWrapper>
  );
}