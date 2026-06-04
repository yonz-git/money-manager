import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import {
  PageWrapper,
  content,
  DeleteModalOverlay,
  DeleteModalContainer,
  DeleteConfirmationMessage,
  DeleteModalButtonContainer,
  DeleteModalButton,
  Content,
} from "../../Components/Transactions/transactions.styles";

async function fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return response.json();
}

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

export default function TransactionDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { data: transaction. isLoading, error } = useSWR(
        id ? `/api/transactions/${id}` : null,
        fetcher
    );

    async function handleDelete() {
        const response = await fetch(`/api/transactions/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            router.push("/");
        }
    }

if(isLoading) {
    return (
        <PageWrapper>
            <Content>
                <p>Transaction not found</p>
                <Link href="/">← Back to transactions</Link>
            </Content>
        </PageWrapper>
    )
}

}

