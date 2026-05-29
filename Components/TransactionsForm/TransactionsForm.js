import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  Card, Heading, Field, LabelText, InputElement, SelectWrapper,
  SelectElement, ChevronIcon, RadioLabel, RadioCircle, RadioDot,
  DateWrapper, DateText, CalendarIcon, HiddenDateInput, SubmitButton, ErrorText
} from './TransactionForm.styles'

const getTodayDateString = () => {
  const today = new Date();
  const year  = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day   = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', year: 'numeric',
});

const formatDisplayDate = (isoDate) => {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  return DATE_FORMATTER.format(new Date(y, m - 1, d));
};

const ErrorMsg = React.memo(({ msg }) =>
  msg ? <ErrorText>{msg}</ErrorText> : null
);
ErrorMsg.displayName = 'ErrorMsg';

const Label = React.memo(({ htmlFor, children }) => (
  <LabelText htmlFor={htmlFor}>{children}</LabelText>
));
Label.displayName = 'Label';

export default function TransactionForm({ onAddTransaction, categoriesData = [] }) {
  const [title,    setTitle]    = useState('');
  const [amount,   setAmount]   = useState('');
  const [category, setCategory] = useState('');
  const [type,     setType]     = useState('');
  const [date,     setDate]     = useState(getTodayDateString);
  const [errors,   setErrors]   = useState({});

  const dateInputRef = useRef(null);

  const handleDateWrapperClick = useCallback(() => {
    if (dateInputRef.current && typeof dateInputRef.current.showPicker === 'function') {
      dateInputRef.current.showPicker();
    }
  }, []);

  const handleAmountChange = useCallback((e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d{0,2}$/.test(val)) {
      setAmount(val);
    }
  }, []);

  const handleAmountKeyDown = useCallback((e) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const errs = {};

    if (!title || title.trim() === '') errs.title = 'Title description is required.';
    if (!amount || isNaN(amount) || Number(amount) <= 0) errs.amount = 'Amount must be greater than 0.';
    if (!category) errs.category = 'Please select a transaction category.';
    if (!type) errs.type = 'Please select Income or Expense.';
    if (!date) errs.date = 'Transaction Date is required.';

    if (Object.keys(errs).length > 0) { 
      setErrors(errs); 
      return; 
    }

    setErrors({});
    onAddTransaction({ title: title.trim(), amount: Number(amount), category, type, date });
    
    setTitle('');
    setAmount('');
    setCategory('');
    setType('');
    setDate(getTodayDateString());
  }, [title, amount, category, type, date, onAddTransaction]);

  const categoryOptions = useMemo(() => {
    return categoriesData.map((item) => {
      const key = item._id?.$oid ?? item._id ?? item.category;
      return <option key={key} value={item.category}>{item.category}</option>;
    });
  }, [categoriesData]);

  return (
    <Card>
      <Heading>Add New Transaction</Heading>

      <form onSubmit={handleSubmit} noValidate>
        <Field>
          <Label htmlFor="title">Transaction Title *</Label>
          <InputElement
            id="title"
            name="title"
            type="text"
            placeholder="e.g., Weekly Groceries"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            $hasError={!!errors.title}
          />
          <ErrorMsg msg={errors.title} />
        </Field>

        <Field>
          <Label htmlFor="amount">Transaction Amount *</Label>
          <InputElement
            id="amount"
            name="amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            onKeyDown={handleAmountKeyDown}
            $hasError={!!errors.amount}
          />
          <ErrorMsg msg={errors.amount} />
        </Field>

        <Field>
          <Label htmlFor="category">Transaction Category *</Label>
          <SelectWrapper>
            <SelectElement
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              $hasError={!!errors.category}
            >
              <option value="">Please select a category</option>
              {categoryOptions}
            </SelectElement>
            <ChevronIcon aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </ChevronIcon>
          </SelectWrapper>
          <ErrorMsg msg={errors.category} />
        </Field>

        <Field>
          <LabelText as="span">Transaction Type *</LabelText>
          <div style={{ display: 'flex', gap: '32px', marginTop: '8px' }}>
            {['Income', 'Expense'].map((val) => (
              <RadioLabel key={val} htmlFor={`type-${val}`}>
                <RadioCircle $checked={type === val}>
                  {type === val && <RadioDot />}
                </RadioCircle>
                <input
                  id={`type-${val}`}
                  name="transactionType"
                  type="radio"
                  value={val}
                  checked={type === val}
                  onChange={(e) => setType(e.target.value)}
                  style={{ display: 'none' }}
                />
                {val}
              </RadioLabel>
            ))}
          </div>
          <ErrorMsg msg={errors.type} />
        </Field>

        <Field>
          <Label htmlFor="date">Transaction Date *</Label>
          <DateWrapper onClick={handleDateWrapperClick}>
            <DateText>{formatDisplayDate(date)}</DateText>
            <CalendarIcon aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </CalendarIcon>
            <HiddenDateInput
              id="date"
              name="date"
              type="date"
              ref={dateInputRef}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </DateWrapper>
          <ErrorMsg msg={errors.date} />
        </Field>

        <SubmitButton type="submit">Add Transaction</SubmitButton>
      </form>
    </Card>
  );
}
