import React from 'react';
import { Card, CardLeft, IconBox, CardTitle, CardMeta, Amount, EditButton } from './transactions.styles';

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

export default function TransactionCard({ transaction, onEdit }) {

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

      <Amount $income={isIncome}>
        {isIncome ? '' : '-'}
        {new Intl.NumberFormat('en-US', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(Math.abs(transaction.amount))}
      </Amount>
      <EditButton type="button" onClick={onEdit}>
        ✏️
      </EditButton>
    </Card>
  );
}