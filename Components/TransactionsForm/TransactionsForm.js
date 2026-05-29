import { useState } from "react";
import {
  Card,
  Heading,
  Field,
  LabelText,
  InputElement,
  SelectWrapper,
  SelectElement,
  ChevronIcon,
  RadioLabel,
  RadioCircle,
  RadioDot,
  RadioGroup,
  VisuallyHiddenInput,
  SubmitButton,
  ErrorText,
} from "./TransactionForm.styles";

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const initialFormData = {
  title: "",
  amount: "",
  category: "",
  type: "",
  date: getTodayDateString(),
};

export default function TransactionForm({ onAddTransaction, categoriesData = [] }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  function handleAmountChange(event) {
    const val = event.target.value;
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setFormData({ ...formData, amount: val });
    }
  }

  function handleAmountKeyDown(event) {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errs = {};
    if (!formData.title || formData.title.trim() === "") errs.title = "Title description is required.";
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) errs.amount = "Amount must be greater than 0.";
    if (!formData.category) errs.category = "Please select a transaction category.";
    if (!formData.type) errs.type = "Please select Income or Expense.";
    if (!formData.date) errs.date = "Transaction Date is required.";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    onAddTransaction({
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    });

    setFormData(initialFormData);
  }

  return (
    <Card>
      <Heading>Add New Transaction</Heading>

      <form onSubmit={handleSubmit} noValidate>
        <Field>
          <LabelText htmlFor="title">Transaction Title *</LabelText>
          <InputElement
            id="title"
            name="title"
            type="text"
            placeholder="e.g., Weekly Groceries"
            value={formData.title}
            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
            $hasError={!!errors.title}
          />
          {errors.title && <ErrorText>{errors.title}</ErrorText>}
        </Field>

        <Field>
          <LabelText htmlFor="amount">Transaction Amount *</LabelText>
          <InputElement
            id="amount"
            name="amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleAmountChange}
            onKeyDown={handleAmountKeyDown}
            $hasError={!!errors.amount}
          />
          {errors.amount && <ErrorText>{errors.amount}</ErrorText>}
        </Field>

        <Field>
          <LabelText htmlFor="category">Transaction Category *</LabelText>
          <SelectWrapper>
            <SelectElement
              id="category"
              name="category"
              value={formData.category}
              onChange={(event) => setFormData({ ...formData, category: event.target.value })}
              $hasError={!!errors.category}
            >
              <option value="">Please select a category</option>
              {categoriesData.map((item) => {
                const key = item._id?.$oid ?? item._id ?? item.category;
                return (
                  <option key={key} value={item.category}>
                    {item.category}
                  </option>
                );
              })}
            </SelectElement>
            <ChevronIcon aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </ChevronIcon>
          </SelectWrapper>
          {errors.category && <ErrorText>{errors.category}</ErrorText>}
        </Field>

        <fieldset>
          <legend>Transaction Type *</legend>
          <RadioGroup>
            {["Income", "Expense"].map((transactionType) => (
              <RadioLabel key={transactionType} htmlFor={`type-${transactionType}`}>
                <RadioCircle $checked={formData.type === transactionType} $value={transactionType}>
                  {formData.type === transactionType && <RadioDot />}
                </RadioCircle>
                <VisuallyHiddenInput
                  id={`type-${transactionType}`}
                  name="transactionType"
                  type="radio"
                  value={transactionType}
                  checked={formData.type === transactionType}
                  onChange={(event) => setFormData({ ...formData, type: event.target.value })}
                />
                {transactionType}
              </RadioLabel>
            ))}
          </RadioGroup>
          {errors.type && <ErrorText>{errors.type}</ErrorText>}
        </fieldset>

        <Field>
          <LabelText htmlFor="date">Transaction Date *</LabelText>
          <InputElement
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={(event) => setFormData({ ...formData, date: event.target.value })}
            $hasError={!!errors.date}
          />
          {errors.date && <ErrorText>{errors.date}</ErrorText>}
        </Field>

        <SubmitButton type="submit">Add Transaction</SubmitButton>
      </form>
    </Card>
  );
}