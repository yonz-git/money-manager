import React, { useState } from "react";
import {
  Card,
  CardLeft,
  CardRight,
  IconBox,
  CardTitle,
  CardMeta,
  Amount,
  CardLink,
} from "./transactions.styles";
import { getIcon } from "../../utils/categoryConfig";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionCard({ transaction }) {
  const isIncome = transaction.amount > 0;

  return (
    <CardLink href={`/transactions/${transaction._id}`}>
      <Card>
        <CardLeft>
          <IconBox>{getIcon(transaction.category)}</IconBox>
          <div>
            <CardTitle>{transaction.title}</CardTitle>
            <CardMeta>
              {isIncome ? "Income" : "Expense"} •{" "}
              {new Date(transaction.date).toLocaleDateString()}
            </CardMeta>
          </div>
        </CardLeft>

        <CardRight>
          <Amount $income={isIncome}>
            {isIncome ? "" : "-"}
            {formatCurrency(Math.abs(transaction.amount))}
          </Amount>
        </CardRight>
      </Card>
    </CardLink>
  );
}
