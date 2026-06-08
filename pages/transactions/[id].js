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
  EditLink,
  BackgroundCanvas,
  FloatingSquare,
} from "../../Components/Transactions/transactions.styles";
import { getIcon } from "../../utils/categoryConfig";
import { formatCurrency } from "../../utils/formatCurrency";

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
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);

  const {
    data: transaction,
    isLoading,
    error,
  } = useSWR(id ? `/api/transactions/${id}` : null);

  async function handleDelete() {
    const response = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setIsDeleteModalOpen(false);
      setIsDeletedSuccessfully(true);

      setTimeout(() => {
        router.push("/");
      }, 1500);
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

  const formattedAmount = formatCurrency(Math.abs(transaction.amount));

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addedTimestamp = transaction.createdAt
    ? formatTimestamp(transaction.createdAt)
    : "—";

  return (
    <>
      <BackgroundCanvas>
        <FloatingSquare
          color="rgba(34, 211, 238, 0.3)"
          size="120px"
          left="10%"
          duration="18s"
          delay="0s"
        />
        <FloatingSquare
          color="rgba(169, 85, 247, 0.45)"
          size="150px"
          left="80%"
          duration="22s"
          delay="5s"
        />
      </BackgroundCanvas>
      <PageWrapper>
        <Content>
          <Link href="/">
            <BackLink>← Back</BackLink>
          </Link>

          <DetailTitle>{transaction.title}</DetailTitle>

          <DetailAmount $isIncome={isIncome}>
            {isIncome ? "" : "-"}
            {formattedAmount}
          </DetailAmount>

          <DetailMeta>Type: {isIncome ? "Income" : "Expense"}</DetailMeta>

          <DetailMeta>
            Category: {getIcon(transaction.category)} {transaction.category}
          </DetailMeta>

          <DetailMeta>Date: {formattedDate}</DetailMeta>

          <DetailMeta>Added: {addedTimestamp}</DetailMeta>

          {transaction.updatedAt &&
            transaction.updatedAt !== transaction.createdAt && (
              <DetailMeta>
                Edited: {formatTimestamp(transaction.updatedAt)}
              </DetailMeta>
            )}

          <DetailActions>
            <EditLink href={`/transactions/${id}/edit`}>Edit</EditLink>

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

          {isDeletedSuccessfully && (
            <DeleteModalOverlay>
              <DeleteModalContainer>
                <DeleteConfirmationMessage>
                  ✅ Transaction successfully deleted!
                </DeleteConfirmationMessage>
              </DeleteModalContainer>
            </DeleteModalOverlay>
          )}
        </Content>
      </PageWrapper>
    </>
  );
}
