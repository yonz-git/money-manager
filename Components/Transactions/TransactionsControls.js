import React from "react";
import { ControlsRow, Dropdown } from "./transactions.styles";
import TransactionsFilter from "../TransactionsFilter/TransactionsFilter";

export default function TransactionsControls({
  sortBy,
  setSortBy,
  categoriesList,
  activeFilter,
  onApplyFilter,
  onClearFilter,
}) {
  return (
    <ControlsRow>
      <Dropdown
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="Newest">Sort</option>
        <option value="Oldest">Oldest</option>
        <option value="AmountHigh">Amount: High to Low</option>
        <option value="AmountLow">Amount: Low to High</option>
      </Dropdown>

      <TransactionsFilter
        categoriesList={categoriesList}
        activeFilter={activeFilter}
        onApplyFilter={onApplyFilter}
        onClearFilter={onClearFilter}
      />
    </ControlsRow>
  );
}
