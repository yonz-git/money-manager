import React from "react";
import { ControlsRow, Dropdown } from "./transactions.styles";
import TransactionsFilter from "../TransactionsFilter/TransactionsFilter";
import TransactionsTypeFilter from "../TransactionsTypeFilter/TransactionsTypeFilter";
import { TypeFilterWrapper } from "../TransactionsTypeFilter/TransactionsTypeFilter.styles";

export default function TransactionsControls({
  sortBy,
  setSortBy,
  categoriesList,
  activeFilter,
  onApplyFilter,
  onClearFilter,
  activeTypeFilter,
  onTypeFilterChange,
}) {
  return (
    <>
      <TypeFilterWrapper>
        <TransactionsTypeFilter
          activeTypeFilter={activeTypeFilter}
          onTypeFilterChange={onTypeFilterChange}
        />
      </TypeFilterWrapper>

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
    </>
  );
}
