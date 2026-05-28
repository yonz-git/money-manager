import React from 'react';
import { ControlsRow, Dropdown } from './transactions.styles';

export default function TransactionsControls({
  sortBy,
  setSortBy,
}) {
  return (
    <ControlsRow>
      <Dropdown value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="Newest">Sort</option>
        <option value="Oldest">Oldest</option>
        <option value="AmountHigh">Amount: High to Low</option>
        <option value="AmountLow">Amount: Low to High</option>
      </Dropdown>
    </ControlsRow>
  );
}