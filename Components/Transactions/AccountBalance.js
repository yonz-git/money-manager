import { BalanceCard, BalanceLabel, BalanceValue } from './transactions.styles';


export default function AccountBalance({transactions = [] }) {
  
  

  function calculateTotal(accumulator, currentTransaction) {
    const amount = Number(currentTransaction.amount) || 0;
    return accumulator + amount;
  }

  const totalBalance = transactions.reduce(calculateTotal, 0);

  function formatCurrency(amount) {
    const absoluteValue = Math.abs(amount).toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (amount < 0) {
      return `-€${absoluteValue}`;
    }
    
    return `€${absoluteValue}`;
  }

  return (
    <BalanceCard $balance={totalBalance}>
      <BalanceLabel>Account Balance</BalanceLabel>
      <BalanceValue>{formatCurrency(totalBalance)}</BalanceValue>
    </BalanceCard>
  );
}