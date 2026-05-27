import React from 'react';
import { Header, IconButton, Title } from './transactions.styles';

export default function TransactionsHeader() {
  return (
    <Header>
      <IconButton type="button">☰</IconButton>
      <Title>Transactions</Title>
      <div style={{ width: 20 }} />
    </Header>
  );
}