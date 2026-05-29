import { BalanceCard, BalanceLabel, BalanceValue } from './transactions.styles';

export default function AccountBalance({ transactions = [] }) {
  
  const totalBalance = transactions.reduce((accumulator, currentTransaction) => {
    return accumulator + (Number(currentTransaction.amount) || 0);
  }, 0);

  
  const formatCurrency = (amount) => {
    const absoluteValue = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return amount < 0 ? ` € -${absoluteValue}` : `€ ${absoluteValue}`;
  };

  return (
   
    <BalanceCard balance={totalBalance}>
      <BalanceLabel>Account Balance</BalanceLabel>
      <BalanceValue>{formatCurrency(totalBalance)}</BalanceValue>
    </BalanceCard>
  );
}