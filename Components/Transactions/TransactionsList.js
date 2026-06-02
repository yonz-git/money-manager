import React from "react";
import TransactionCard from "./TransactionCard";
import { ListWrapper } from "./transactions.styles";

export default function TransactionsList({
  transactions,
  onDeleteSuccess,
  onEditTransaction,
}) {
  return (
    <ListWrapper>
      {transactions.map((transactionItem) => (
        <TransactionCard
          key={transactionItem._id}
          transaction={transactionItem}
          onDeleteSuccess={onDeleteSuccess}
          onEdit={() => onEditTransaction(transactionItem)}
        />
      ))}
    </ListWrapper>
  );
}
