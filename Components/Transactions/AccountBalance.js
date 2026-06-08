import { BalanceCard, BalanceLabel, BalanceValue } from "./transactions.styles";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AccountBalance({ transactions = [] }) {
  function calculateTotal(accumulator, currentTransaction) {
    const amount = Number(currentTransaction.amount) || 0;
    return accumulator + amount;
  }

  const totalBalance = transactions.reduce(calculateTotal, 0);

  return (
    <BalanceCard $balance={totalBalance}>
      <BalanceLabel>Account Balance</BalanceLabel>
      <BalanceValue>{formatCurrency(totalBalance)}</BalanceValue>
    </BalanceCard>
  );
}
