import { Header, Title, ToggleButton, StyledLogo } from "./transactions.styles";

export default function TransactionsHeader({ isFormOpen, onToggleForm }) {
  return (
    <Header>
      <StyledLogo src="/CoinOink.png" alt="Money Manager Logo" />
      <Title>Coin Oink</Title>

      <ToggleButton
        onClick={onToggleForm}
        $isOpen={isFormOpen}
        aria-label="Toggle Add Transaction Form"
      >
        {isFormOpen ? "×" : "+"}
      </ToggleButton>
    </Header>
  );
}
