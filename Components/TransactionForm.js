// components/TransactionForm.jsx
import { useState } from "react";
import styled from "styled-components";
import categories from "@/assets/categories.json";

const today = new Date().toISOString().split("T")[0];

// ── Styled components ──────────────────────────────────────────────

const Section = styled.section`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e0e0e0;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 16px 0;
  color: #333;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FieldWrapper = styled.div``;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #555;
`;

const FieldSpan = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "#ccc")};
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "red" : "#888")};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "#ccc")};
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  cursor: pointer;
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 11px;
  display: block;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-top: 6px;
  transition: background 0.2s;

  &:hover {
    background: #222;
  }
`;

const SuccessAlert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e6f4ea;
  color: #137333;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #ceead6;
  font-size: 14px;
`;

const DismissBtn = styled.button`
  background: none;
  border: none;
  color: #137333;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
`;



export default function TransactionForm({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(today);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!amount || Number(amount) <= 0) e.amount = "Amount must be greater than 0.";
    if (!category) e.category = "Please select a category.";
    if (!type) e.type = "Please select a transaction type.";
    if (!date) e.date = "Date is required.";
    return e;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const newTransaction = {
      amount: Math.abs(Number(amount)), // store positive; type is source of truth
      category,
      type,
      date,
    };

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      onSuccess();         // calls mutate() in parent → prepends new item to list
      setShowSuccess(true);
      setAmount("");
      setCategory("");
      setType("");
      setDate(today);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }

  return (
    <>
      {/* Success banner — auto-dismisses after 5s */}
      {showSuccess && (
        <SuccessAlert role="status">
          <span>✔️ Transaction added successfully.</span>
          <DismissBtn onClick={() => setShowSuccess(false)} aria-label="Dismiss">
            ✕
          </DismissBtn>
        </SuccessAlert>
      )}

      <Section>
        <FormTitle>Create Transaction</FormTitle>

        <StyledForm onSubmit={handleSubmit} noValidate>

          {/* Transaction Amount */}
          <FieldWrapper>
            <Label htmlFor="amount">Transaction Amount *</Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              $hasError={!!errors.amount}
            />
            {errors.amount && <ErrorMsg role="alert">{errors.amount}</ErrorMsg>}
          </FieldWrapper>

          {/* Transaction Category */}
          <FieldWrapper>
            <Label htmlFor="category">Transaction Category *</Label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              $hasError={!!errors.category}
            >
              <option value="">Please select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            {errors.category && <ErrorMsg role="alert">{errors.category}</ErrorMsg>}
          </FieldWrapper>

          {/* Transaction Type — radio buttons */}
          <FieldWrapper>
            <FieldSpan id="type-label">Transaction Type *</FieldSpan>
            <RadioGroup role="radiogroup" aria-labelledby="type-label">
              <RadioLabel>
                <input
                  type="radio"
                  name="type"
                  value="Income"
                  checked={type === "Income"}
                  onChange={() => setType("Income")}
                />
                Income
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="type"
                  value="Expense"
                  checked={type === "Expense"}
                  onChange={() => setType("Expense")}
                />
                Expense
              </RadioLabel>
            </RadioGroup>
            {errors.type && <ErrorMsg role="alert">{errors.type}</ErrorMsg>}
          </FieldWrapper>

          {/* Transaction Date — defaults to today */}
          <FieldWrapper>
            <Label htmlFor="date">Transaction Date *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              $hasError={!!errors.date}
            />
            {errors.date && <ErrorMsg role="alert">{errors.date}</ErrorMsg>}
          </FieldWrapper>

          <SubmitButton type="submit">Add Transaction</SubmitButton>

        </StyledForm>
      </Section>
    </>
  );
}
