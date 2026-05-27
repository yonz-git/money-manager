import React from 'react';
import { Card, CardLeft, IconBox, CardTitle, CardMeta, Amount } from './transactions.styles';

function getIcon(category) {
  const map = {
    Groceries: '🛒',
    Rent: '🏠',
    Salary: '💼',
    Miscellaneous: '📦',
    Entertainment: '🎭',
    Health: '🩺',
    Investment: '📈',
    Utilities: '⚡',
    Education: '📚',
    Restaurants: '🍽️',
    Savings: '💰',
    Transportation: '🚌',
    Insurance: '🛡️',
  };

  return map[category] || '•';
}

export default function TransactionCard({ transaction }) {
  const isIncome = transaction.amount >= 0;

  return (
    <Card>
      <CardLeft>
        <IconBox>{getIcon(transaction.category)}</IconBox>
        <div>
          <CardTitle>{transaction.title}</CardTitle>
          <CardMeta>
            {isIncome ? 'Income' : 'Expense'} • {new Date(transaction.date).toLocaleDateString()}
          </CardMeta>
        </div>
      </CardLeft>

      <Amount $income={isIncome}>{Math.abs(transaction.amount).toFixed(2)}</Amount>
    </Card>
  );
}