import styled, { keyframes } from "styled-components"; 

export const Card = styled.div`
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px 18px 20px;
  background-color: #1c0069;
  font-family: "DM Sans", sans-serif;
  box-sizing: border-box;
  width: 100%;
  color: #ffffff;
`;

export const LabelText = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
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
  border: ${(props) =>
    props.$hasError ? "1.5px solid #e74c3c" : "1.5px solid #e0e0e0"};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
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
  border: ${(props) =>
    props.$hasError ? "1.5px solid #e74c3c" : "1.5px solid #e0e0e0"};
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
  color: #e6e6e6;
  cursor: pointer;
  user-select: none;
`;

export const RadioCircle = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid ${(props) => (props.$checked ? "#2ecc71" : "#ccc")};
  background-color: ${(props) => (props.$checked ? "#2ecc71" : "transparent")};
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

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const FormWrapper = styled.div`
  background-color: #1e0059;
  border: 1px solid #7a46e6;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  overflow: hidden;
`;


const slideInLeft = keyframes`
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Heading = styled.p`
  color: #fff;
  margin-top: 0;
  
  opacity: 0;
  animation: ${slideInLeft} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${(props) => (props.$index || 0) * 0.07}s;
`;
export const ModalOverlay = styled.div`
position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  /* Smooth fade transitions for the dark backdrop tint */
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  /* Read the React state flag to change visibility instantly */
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.$isOpen ? 'all' : 'none')};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  
  opacity: 0;
  animation: ${slideInLeft} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${(props) => (props.$index || 0) * 0.07}s;
`;

export const StaggeredFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 20px 0;
  
  opacity: 0;
  animation: ${slideInLeft} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${(props) => (props.$index || 0) * 0.07}s;
`;

export const StaggeredButtonRow = styled(ButtonRow)`
  opacity: 0;
  animation: ${slideInLeft} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${(props) => (props.$index || 0) * 0.07}s;
`;

export const SingleButtonWrapper = styled.div`
  opacity: 0;
  animation: ${slideInLeft} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${(props) => (props.$index || 0) * 0.07}s;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 28px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
  
  &:active {
    transform: scale(0.9);
  }
`;