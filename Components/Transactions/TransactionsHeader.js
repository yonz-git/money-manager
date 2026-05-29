import React from 'react';
import { Header, Title } from './transactions.styles';

export default function TransactionsHeader({ isFormOpen, setIsFormOpen }) {
  return (
    <Header>
      <Title>Activities</Title>
       <button 
        onClick={() => setIsFormOpen(!isFormOpen)}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid #1a1a1a',
          background: isFormOpen ? '#f5f5f5' : 'none',
          fontSize: '24px',
          lineHeight: '1',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          padding: 0
        }}
        aria-label="Toggle Add Transaction Form"
      >
        {isFormOpen ? '×' : '+'}
      </button>
      
    </Header>
  );
}