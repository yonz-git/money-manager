import React from "react";
import TransactionCard from "./TransactionCard";
import { ListWrapper } from "./transactions.styles";

export default function TransactionsList({ transactions }) {
  return (
    <ListWrapper>
      {transactions.map((transactionItem) => (
        <TransactionCard
          key={transactionItem._id}
          transaction={transactionItem}
        />
      ))}
    </ListWrapper>
  );
}
