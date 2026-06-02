import React, { useEffect, useState } from "react";
import {
  FilterButton,
  FilterPanel,
  FilterOption,
  FilterRadioLabel,
  FilterActions,
  FilterApplyButton,
  FilterClearButton,
  FilterWrapper,
  FilterOverlay,
} from "./TransactionsFilter.styles";

export default function TransactionsFilter({
  categoriesList,
  activeFilter,
  onApplyFilter,
  onClearFilter,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingFilter, setPendingFilter] = useState(activeFilter);

  function handleOpen() {
    setPendingFilter(activeFilter);
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleApply() {
    onApplyFilter(pendingFilter);
    setIsOpen(false);
  }

  function handleClear() {
    onClearFilter();
    setPendingFilter(null);
    setIsOpen(false);
  }

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
    <FilterWrapper>
      <FilterButton
        type="button"
        $isActive={activeFilter !== null}
        onClick={isOpen ? handleClose : handleOpen}
      >
        Filter{activeFilter ? `: ${activeFilter}` : ""}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </FilterButton>

      {isOpen && (
        <>
          <FilterOverlay onClick={handleClose} />
          <FilterPanel>
            <FilterOption>
              <FilterRadioLabel>
                <input
                  type="radio"
                  name="categoryFilter"
                  value=""
                  checked={pendingFilter === null}
                  onChange={() => setPendingFilter(null)}
                />
                All Categories
              </FilterRadioLabel>
            </FilterOption>

            {categoriesList.map((item) => {
              const key = item._id?.$oid ?? item._id ?? item.category;
              return (
                <FilterOption key={key}>
                  <FilterRadioLabel>
                    <input
                      type="radio"
                      name="categoryFilter"
                      value={item.category}
                      checked={pendingFilter === item.category}
                      onChange={() => setPendingFilter(item.category)}
                    />
                    {item.category}
                  </FilterRadioLabel>
                </FilterOption>
              );
            })}

            <FilterActions>
              <FilterApplyButton type="button" onClick={handleApply}>
                Apply
              </FilterApplyButton>
              <FilterClearButton type="button" onClick={handleClear}>
                Clear
              </FilterClearButton>
            </FilterActions>
          </FilterPanel>
        </>
      )}
    </FilterWrapper>
  );
}
