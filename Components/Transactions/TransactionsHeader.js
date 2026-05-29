import { Header, Title, ToggleButton } from './transactions.styles';

export default function TransactionsHeader({ isFormOpen, onToggleForm }) {
  return (
    <Header>
      <Title>Activities</Title>
      <ToggleButton
        onClick={onToggleForm}
        $isOpen={isFormOpen}
        aria-label="Toggle Add Transaction Form"
      >
        {isFormOpen ? '×' : '+'}
      </ToggleButton>
    </Header>
  );
}