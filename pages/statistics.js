import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { getIcon, getCategoryColor } from "../utils/categoryConfig";
import {
  PageWrapper,
  Content,
  BackgroundCanvas,
  FloatingAsset,
} from "../Components/Transactions/transactions.styles";
import {
  StatsHeader,
  StatsTitle,
  MonthNavigator,
  NavButton,
  MonthLabel,
  SummaryGrid,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  SectionTitle,
  CategoryList,
  CategoryRow,
  CategoryInfo,
  CategoryName,
  BarWrapper,
  Bar,
  CategoryAmount,
  MonthList,
  MonthRow,
  MonthRowLabel,
  MonthRowMeta,
  MonthRowBalance,
  EmptyState,
  BackToHome,
} from "../Components/Statistics/statistics.styles";
import { formatCurrency } from "../utils/formatCurrency";

function groupByMonth(transactions) {
  const groups = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(transaction);
  });
  return groups;
}

function calculateSummary(transactions) {
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  return {
    income,
    expenses,
    balance: income + expenses,
  };
}

function groupByCategory(transactions) {
  const groups = {};
  transactions
    .filter((transaction) => transaction.amount < 0)
    .forEach((transaction) => {
      if (!groups[transaction.category]) groups[transaction.category] = 0;
      groups[transaction.category] += Math.abs(transaction.amount);
    });
  return groups;
}

function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split("-");
  const date = new Date(year, month - 1);
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export default function StatisticsPage() {
  const {
    data: transactionsData,
    isLoading,
    error,
  } = useSWR("/api/transactions");

  const transactions = Array.isArray(transactionsData) ? transactionsData : [];
  const grouped = groupByMonth(transactions);
  const allMonths = Object.keys(grouped).sort((monthA, monthB) =>
    monthB.localeCompare(monthA)
  );

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const selectedMonth = allMonths[selectedMonthIndex];
  const selectedTransactions = selectedMonth ? grouped[selectedMonth] : [];

  const summary = calculateSummary(selectedTransactions);
  const categoryGroups = groupByCategory(selectedTransactions);
  const totalExpenses = Math.abs(summary.expenses);

  const sortedCategories = Object.entries(categoryGroups).sort(
    (categoryA, categoryB) => categoryB[1] - categoryA[1]
  );

  if (isLoading) {
    return (
      <PageWrapper>
        <Content>
          <p>Loading...</p>
        </Content>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <Content>
          <p>Something went wrong loading your statistics.</p>
          <Link href="/">← Back to home</Link>
        </Content>
      </PageWrapper>
    );
  }

  return (
    <>
      <BackgroundCanvas>
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="5%" $size="170px" $duration="12s" $delay="1s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="25%" $size="170px" $duration="9s" $delay="12s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="45%" $size="170px" $duration="11s" $delay="4s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="65%" $size="170px" $duration="8s" $delay="8s" />
  <FloatingAsset src="/piggy-coin.png" alt="" width={170} height={170} $left="85%" $size="170px" $duration="8s" $delay="10s" />
</BackgroundCanvas>

      <PageWrapper>
        <StatsHeader>
          <StatsTitle>Statistics</StatsTitle>
        </StatsHeader>

        <Content>
          {allMonths.length === 0 ? (
            <EmptyState>
              <p>No transactions found.</p>
              <Link href="/">← Back to home</Link>
            </EmptyState>
          ) : (
            <>
              <MonthNavigator>
                <NavButton
                  onClick={() => setSelectedMonthIndex((index) => index + 1)}
                  disabled={selectedMonthIndex >= allMonths.length - 1}
                >
                  ←
                </NavButton>
                <MonthLabel>{formatMonthLabel(selectedMonth)}</MonthLabel>
                <NavButton
                  onClick={() => setSelectedMonthIndex((index) => index - 1)}
                  disabled={selectedMonthIndex === 0}
                >
                  →
                </NavButton>
              </MonthNavigator>

              <SummaryGrid>
                <SummaryCard>
                  <SummaryLabel>Income</SummaryLabel>
                  <SummaryValue $positive>
                    {formatCurrency(summary.income)}
                  </SummaryValue>
                </SummaryCard>
                <SummaryCard>
                  <SummaryLabel>Expenses</SummaryLabel>
                  <SummaryValue $negative>
                    {formatCurrency(Math.abs(summary.expenses))}
                  </SummaryValue>
                </SummaryCard>
                <SummaryCard $full>
                  <SummaryLabel>Balance</SummaryLabel>
                  <SummaryValue
                    $positive={summary.balance >= 0}
                    $negative={summary.balance < 0}
                  >
                    {summary.balance < 0 ? "-" : ""}
                    {formatCurrency(Math.abs(summary.balance))}
                  </SummaryValue>
                </SummaryCard>
              </SummaryGrid>

              <SectionTitle>Spending by category</SectionTitle>
              {sortedCategories.length === 0 ? (
                <EmptyState>No expenses this month.</EmptyState>
              ) : (
                <CategoryList>
                  {sortedCategories.map(([category, amount]) => (
                    <CategoryRow key={category}>
                      <CategoryInfo>
                        <span>{getIcon(category)}</span>
                        <CategoryName>{category}</CategoryName>
                      </CategoryInfo>
                      <BarWrapper>
                        <Bar
                          $width={(amount / totalExpenses) * 100}
                          $color={getCategoryColor(category)}
                        />
                      </BarWrapper>
                      <CategoryAmount $color={getCategoryColor(category)}>
                        {formatCurrency(amount)}
                      </CategoryAmount>
                    </CategoryRow>
                  ))}
                </CategoryList>
              )}

              <SectionTitle>Month by month</SectionTitle>
              <MonthList>
                {allMonths.map((month) => {
                  const monthSummary = calculateSummary(grouped[month]);
                  return (
                    <MonthRow key={month} $active={month === selectedMonth}>
                      <MonthRowLabel>{formatMonthLabel(month)}</MonthRowLabel>
                      <MonthRowMeta>
                        {grouped[month].length} transactions
                      </MonthRowMeta>
                      <MonthRowBalance $positive={monthSummary.balance >= 0}>
                        {monthSummary.balance < 0 ? "-" : ""}
                        {formatCurrency(Math.abs(monthSummary.balance))}
                      </MonthRowBalance>
                    </MonthRow>
                  );
                })}
              </MonthList>

              <BackToHome href="/">← Back to home</BackToHome>
            </>
          )}
        </Content>
      </PageWrapper>
    </>
  );
}
