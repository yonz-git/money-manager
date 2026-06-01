import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const DialogBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 320px;
  width: 90%;
  text-align: center;
`;

export const DialogTitle = styled.h2`
  margin-bottom: 8px;
  font-size: 18px;
`;

export const DialogMessage = styled.p`
  margin-bottom: 24px;
  color: #666;
  font-size: 14px;
`;

export const DialogButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const DialogButton = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $primary }) => ($primary ? "500" : "400")};
`;