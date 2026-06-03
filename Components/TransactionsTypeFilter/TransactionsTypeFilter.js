import React, { useState, useEffect } from "react";
import {
  TypeFilterWrapper,
  TypeFilterTrigger,
  TypeFilterTag,
  TypeFilterTagX,
  TypeFilterPanel,
  TypeFilterOption,
  TypeFilterRadioLabel,
  TypeFilterDescription,
  TypeFilterOverlay,
} from "./TransactionsTypeFilter.styles";

const Options = [
  {
    value: "All",
    label: "All transactions",
    description: "Show all income and expense",
  },
  {
    value: "Income",
    label: "Income",
    description: "Show income transactions only",
  },
  {
    value: "Expense",
    label: "Expense",
    description: "Show expense transactions only",
  },
];

export default function TransactionsTypeFilter({
  activeTypeFilter,
  onTypeFilterChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingFilter, setPendingFilter] = useState(activeTypeFilter);

  function handleOpen() {
    setPendingFilter(activeTypeFilter);
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleClear() {
    onTypeFilterChange("All");
    setPendingFilter("All");
  }

  function handleOptionChange(event) {
    setPendingFilter(event.target.value);
    onTypeFilterChange(event.target.value);
    setIsOpen(false);
  }

  // Klaus's suggestion for the other filters
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <TypeFilterWrapper>
      <TypeFilterTrigger>
        <TypeFilterTag
          type="button"
          $type={activeTypeFilter}
          onClick={handleOpen}
        >
          {Options.find((option) => option.value === activeTypeFilter)?.label ??
            "All transactions"}
        </TypeFilterTag>
        {activeTypeFilter !== "All" && (
          <TypeFilterTagX type="button" onClick={handleClear}>
            ×
          </TypeFilterTagX>
        )}
      </TypeFilterTrigger>

      {isOpen && (
        <>
          <TypeFilterOverlay onClick={handleClose} />
          <TypeFilterPanel>
            {Options.map((option) => (
              <TypeFilterOption key={option.value}>
                <TypeFilterRadioLabel>
                  <input
                    type="radio"
                    name="typeFilter"
                    value={option.value}
                    checked={pendingFilter === option.value}
                    onChange={handleOptionChange}
                  />
                  <div>
                    <strong>{option.label}</strong>
                    <TypeFilterDescription>
                      {option.description}
                    </TypeFilterDescription>
                  </div>
                </TypeFilterRadioLabel>
              </TypeFilterOption>
            ))}
          </TypeFilterPanel>
        </>
      )}
    </TypeFilterWrapper>
  );
}
