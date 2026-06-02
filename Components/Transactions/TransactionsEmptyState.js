import React from "react";
import {
  EmptyWrap,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
} from "./transactions.styles";

export default function TransactionsEmptyState({ isFiltered = false }) {
  return (
    <EmptyWrap>
      <EmptyIcon>{isFiltered ? "🔍" : "🗂️"}</EmptyIcon>
      <EmptyTitle>
        {isFiltered ? "No matches found" : "No transactions found"}
      </EmptyTitle>
      <EmptyText>
        {isFiltered
          ? "No transactions match the selected category. Try a different filter or clear it."
          : "You don't have any transactions yet. Add transactions to get started."}
      </EmptyText>
    </EmptyWrap>
  );
}
