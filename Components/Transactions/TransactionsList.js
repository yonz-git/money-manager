import React from 'react';
import TransactionCard from './TransactionCard';
import { List } from './transactions.styles';

export default function TransactionsList({ transactions }) {
  return (
    <List>
      {transactions.map((tx) => (
        <TransactionCard key={tx._id} transaction={tx} />
      ))}
    </List>
  );
}