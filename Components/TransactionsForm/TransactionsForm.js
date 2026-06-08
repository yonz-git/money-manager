import DiscardDialog from "./DiscardDialog";
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
  ModalOverlay,
  FormWrapper,
  StaggeredFieldset,     
  StaggeredButtonRow,     
  SingleButtonWrapper,
  FormHeader,  
  CloseButton
} from "./TransactionForm.styles";

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function TransactionForm({
  onSaveTransaction,
  isOpen,
  categoriesData = [],
  initialData,
  onCancel,
}) {
  const [formData, setFormData] = useState(
    initialData
      ? {
          title: initialData.title || "",
          amount: String(Math.abs(initialData.amount)),
          category: initialData.category || "",
          type: initialData.amount >= 0 ? "Income" : "Expense",
          date: initialData.date
            ? initialData.date.slice(0, 10)
            : getTodayDateString(),
        }
      : {
          title: "",
          amount: "",
          category: "",
          type: "",
          date: getTodayDateString(),
        }
  );
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(initialData);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  function handleAmountChange(event) {
    const value = event.target.value;
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setFormData({ ...formData, amount: value });
    }
  }

  function handleAmountKeyDown(event) {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = {};
    if (!formData.title || formData.title.trim() === "")
      validationErrors.title = "Title description is required.";
    if (
      !formData.amount ||
      isNaN(formData.amount) ||
      Number(formData.amount) <= 0
    )
      validationErrors.amount = "Amount must be greater than 0.";
    if (!formData.category)
      validationErrors.category = "Please select a transaction category.";
    if (!formData.type)
      validationErrors.type = "Please select Income or Expense.";
    if (!formData.date) validationErrors.date = "Transaction Date is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await onSaveTransaction({
        title: formData.title.trim(),
        amount: Number(formData.amount),
        category: formData.category,
        type: formData.type,
        date: formData.date,
      });
      if (!isEditMode) {
        setFormData({
          title: "",
          amount: "",
          category: "",
          type: "",
          date: getTodayDateString(),
        });
      }
    } catch (error) {
      setErrors({ submit: error.message });
    }
  }

  return (
    <Card>
     
      <ModalOverlay $isOpen={isOpen} onClick={onCancel}>
        <FormWrapper onClick={(event) => event.stopPropagation()}>
          
        
          <FormHeader>
            <Heading $index={0}>
              {isEditMode ? "Update Transaction" : "Add New Transaction"}
            </Heading>
            <CloseButton type="button" onClick={onCancel}>×</CloseButton>
          </FormHeader>
          <form onSubmit={handleSubmit} noValidate>
            
          
            <Field $index={1}>
              <LabelText htmlFor="title">Transaction Title *</LabelText>
              <InputElement
                id="title"
                name="title"
                type="text"
                placeholder="e.g., Weekly Groceries"
                value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
                $hasError={!!errors.title}
              />
              {errors.title && <ErrorText>{errors.title}</ErrorText>}
            </Field>

            
            <Field $index={2}>
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

           
            <Field $index={3}>
              <LabelText htmlFor="category">Transaction Category *</LabelText>
              <SelectWrapper>
                <SelectElement
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(event) =>
                    setFormData({ ...formData, category: event.target.value })
                  }
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </ChevronIcon>
              </SelectWrapper>
              {errors.category && <ErrorText>{errors.category}</ErrorText>}
            </Field>

         
            <StaggeredFieldset $index={4}>
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
                      onChange={(event) =>
                        setFormData({ ...formData, type: event.target.value })
                      }
                    />
                    {transactionType}
                  </RadioLabel>
                ))}
              </RadioGroup>
              {errors.type && <ErrorText>{errors.type}</ErrorText>}
            </StaggeredFieldset>

          
            <Field $index={5}>
              <LabelText htmlFor="date">Transaction Date *</LabelText>
              <InputElement
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={(event) =>
                  setFormData({ ...formData, date: event.target.value })
                }
                $hasError={!!errors.date}
              />
              {errors.date && <ErrorText>{errors.date}</ErrorText>}
            </Field>

          
            {isEditMode ? (
              <StaggeredButtonRow $index={6}>
                <SubmitButton type="submit">Save</SubmitButton>
                <SubmitButton type="button" onClick={() => setShowDiscardDialog(true)}>
                  Cancel
                </SubmitButton>
              </StaggeredButtonRow>
            ) : (
              <SingleButtonWrapper $index={6}>
                <SubmitButton type="submit">Add Transaction</SubmitButton>
              </SingleButtonWrapper>
            )}

            {errors.submit && <ErrorText>{errors.submit}</ErrorText>}
            {showDiscardDialog && (
              <DiscardDialog
                onDiscard={onCancel}
                onKeepEditing={() => setShowDiscardDialog(false)}
              />
            )}
          </form>
        </FormWrapper>
      </ModalOverlay>
    </Card>
  );
}
