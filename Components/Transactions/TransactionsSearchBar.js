import React from 'react';
import { SearchWrapper, SearchInput } from './transactions.styles';

export default function TransactionsSearchBar({ search, setSearch }) {
  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchWrapper>
  );
}