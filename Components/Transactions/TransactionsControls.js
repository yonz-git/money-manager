import React, { useState } from "react";
import { 
  ControlsRow, 
  DropdownContainer, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from "./transactions.styles";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
  const sortLabels = {
    Newest: "Sort",
    Oldest: "Oldest",
    AmountHigh: "Amount: High to Low",
    AmountLow: "Amount: Low to High",
  };

  const handleSelectOption = (value) => {
    setSortBy(value);           
    setIsDropdownOpen(false);   
  };

  return (
    <>
      <TypeFilterWrapper>
        <TransactionsTypeFilter
          activeTypeFilter={activeTypeFilter}
          onTypeFilterChange={onTypeFilterChange}
        />
      </TypeFilterWrapper>

      <ControlsRow>
        
        <DropdownContainer>
          <DropdownTrigger 
            type="button" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{sortLabels[sortBy] || "Sort"}</span>
            <span style={{ fontSize: "10px", marginLeft: "8px" }}>▼</span>
          </DropdownTrigger>

          <DropdownMenu $isOpen={isDropdownOpen}>
            <DropdownItem type="button" onClick={() => handleSelectOption("Newest")}>
              Sort
            </DropdownItem>
            <DropdownItem type="button" onClick={() => handleSelectOption("Oldest")}>
              Oldest
            </DropdownItem>
            <DropdownItem type="button" onClick={() => handleSelectOption("AmountHigh")}>
              Amount: High to Low
            </DropdownItem>
            <DropdownItem type="button" onClick={() => handleSelectOption("AmountLow")}>
              Amount: Low to High
            </DropdownItem>
          </DropdownMenu>
        </DropdownContainer>

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