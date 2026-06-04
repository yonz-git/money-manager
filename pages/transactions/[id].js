import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import {
  PageWrapper,
  Content,
  DeleteModalOverlay,
  DeleteModalContainer,
  DeleteConfirmationMessage,
  DeleteModalButtonContainer,
  DeleteModalButton,
  DetailTitle,
  DetailAmount,
  DetailMeta,
  BackLink,
  DetailActions,
  ActionButton,
} from "../../Components/Transactions/transactions.styles";
import { getIcon } from "../../utils/getIcon";

async function fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return response.json();
}

function formatTimestamp(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  if (isToday) {
    return `Today at ${date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TransactionDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: transaction,
    isLoading,
    error,
  } = useSWR(id ? `/api/transactions/${id}` : null, fetcher);

  async function handleDelete() {
    const response = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  if (isLoading) {
    return (
      <PageWrapper>
        <Content>
          <p>Loading...</p>
        </Content>
      </PageWrapper>
    );
  }

  if (error || !transaction) {
    return (
      <PageWrapper>
        <Content>
          <p>Transaction not found.</p>
          <Link href="/">← Back to transactions</Link>
        </Content>
      </PageWrapper>
    );
  }

  const isIncome = transaction.amount > 0;

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(transaction.amount));

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addedTimestamp = transaction.createdAt
    ? formatTimestamp(transaction.createdAt)
    : "—";

  return (
    <PageWrapper>
      <Content>
        <Link href="/">
          <BackLink>← Back</BackLink>
        </Link>

        <DetailTitle>{transaction.title}</DetailTitle>

        <DetailAmount $isIncome={isIncome}>
          {isIncome ? "+" : "-"}
          {formattedAmount} €
        </DetailAmount>

        <DetailMeta>Type: {isIncome ? "Income" : "Expense"}</DetailMeta>

        <DetailMeta>
          Category: {getIcon(transaction.category)} {transaction.category}
        </DetailMeta>

        <DetailMeta>Date: {formattedDate}</DetailMeta>

        <DetailMeta>Added: {addedTimestamp}</DetailMeta>

        <DetailActions>
          <ActionButton onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </ActionButton>
        </DetailActions>

        {isDeleteModalOpen && (
          <DeleteModalOverlay>
            <DeleteModalContainer role="dialog" aria-modal="true">
              <DeleteConfirmationMessage>
                Are you sure you want to permanently delete this transaction?
              </DeleteConfirmationMessage>
              <DeleteModalButtonContainer>
                <DeleteModalButton
                  type="button"
                  $variant="destructive"
                  onClick={handleDelete}
                >
                  Confirm
                </DeleteModalButton>
                <DeleteModalButton
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </DeleteModalButton>
              </DeleteModalButtonContainer>
            </DeleteModalContainer>
          </DeleteModalOverlay>
        )}
      </Content>
    </PageWrapper>
  );
}
