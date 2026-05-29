import styled from 'styled-components';

export const Card = styled.div`
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px 18px 20px;
  background-color: #ffffff;
  font-family: 'DM Sans', sans-serif;
  box-sizing: border-box;
  width: 100%;
`;

export const Heading = styled.p`
  margin: 0 0 14px 0;
  font-size: 15px;
  font-weight: 600;
  color: #111;
  letter-spacing: -0.01em;
`;

export const Field = styled.div`
  margin-bottom: 14px;
`;

export const LabelText = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
`;

export const InputElement = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #111;
  background-color: #fff;
  box-sizing: border-box;
  outline: none;
  border: ${props => props.$hasError ? '1.5px solid #e74c3c' : '1.5px solid #e0e0e0'};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectElement = styled.select`
  width: 100%;
  padding: 10px 36px 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #111;
  background-color: #fff;
  box-sizing: border-box;
  outline: none;
  appearance: none;
  cursor: pointer;
  border: ${props => props.$hasError ? '1.5px solid #e74c3c' : '1.5px solid #e0e0e0'};
`;

export const ChevronIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  user-select: none;
`;

export const RadioCircle = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid ${props => props.$checked ? '#2ecc71' : '#ccc'};
  background-color: ${props => props.$checked ? '#2ecc71' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const RadioDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 8px;
`;

export const DateWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  background-color: #fff;
`;

export const DateText = styled.span`
  font-size: 14px;
  color: #111;
  flex: 1;
`;

export const CalendarIcon = styled.span`
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const HiddenDateInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 6px;
`;

export const ErrorText = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #e74c3c;
  font-weight: 500;
`;

export const VisuallyHiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;