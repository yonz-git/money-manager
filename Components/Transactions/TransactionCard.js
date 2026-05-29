import React, { useState } from "react";
import {
  Card,
  CardLeft,
  CardRight,
  IconBox,
  CardTitle,
  CardMeta,
  Amount,
  DeleteButton,
  DeleteModalOverlay,
  DeleteModalDialogContainer,
  DeleteConfirmationMessage,
  DeleteModalButtonContainer,
  DeleteModalButton,
} from "./transactions.styles";

function getIcon(category) {
  const map = {
    Groceries: "🛒",
    Rent: "🏠",
    Salary: "💼",
    Miscellaneous: "📦",
    Entertainment: "🎭",
    Health: "🩺",
    Investment: "📈",
    Utilities: "⚡",
    Education: "📚",
    Restaurants: "🍽️",
    Savings: "💰",
    Transportation: "🚌",
    Insurance: "🛡️",
  };

  return map[category] || "•";
}

export default function TransactionCard({ transaction }) {
  const isIncome = transaction.amount >= 0;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
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
          {new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(Math.abs(transaction.amount))}
        </Amount>

        <DeleteButton
          type="button"
          aria-label={`Delete ${transaction.title} transaction`}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="currentColor"
          >
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
          </svg>
        </DeleteButton>
      </CardRight>

      {isDeleteModalOpen && (
        <DeleteModalOverlay>
          <DeleteModalDialogContainer role="dialog" aria-modal="true">
            <DeleteConfirmationMessage>
              Are you sure you want to permanently delete this transaction?
            </DeleteConfirmationMessage>
            <DeleteModalButtonContainer>
              <DeleteModalButton type="button" $variant="destructive">
                Confirm
              </DeleteModalButton>
              <DeleteModalButton
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </DeleteModalButton>
            </DeleteModalButtonContainer>
          </DeleteModalDialogContainer>
        </DeleteModalOverlay>
      )}
    </Card>
  );
}
