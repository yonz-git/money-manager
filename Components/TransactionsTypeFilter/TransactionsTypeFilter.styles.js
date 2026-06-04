import styled from "styled-components";

export const TypeFilterWrapper = styled.div`
  position: relative;
  width: 100%;
  border-right: 0.01px solid #bdbdbd;
  border-radius: 4px;
  margin-bottom: 2px;
`;

export const TypeFilterTrigger = styled.div`
  display: flex;
  align-items: center;
`;

export const TypeFilterTag = styled.button`
  flex: 1;
  height: 40px;
  padding: 0 14px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 4px 0 0 4px;
  transition:
    background 0.2s,
    color 0.2s;
  text-align: left;

  background: ${({ $type }) => {
    if ($type === "Income") return "#2ecc71";
    if ($type === "Expense") return "#e74c3c";
    return "#fff";
  }};

  color: ${({ $type }) => {
    if ($type === "Income" || $type === "Expense") return "#fff";
    return "#1a1a1a";
  }};

  border: 1px solid
    ${({ $type }) => {
      if ($type === "Income") return "#2ecc71";
      if ($type === "Expense") return "#e74c3c";
      return "#bdbdbd";
    }};

  border-right: none;
`;

export const TypeFilterTagX = styled.button`
  height: 40px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  border: 1px solid #bdbdbd;
  border-left: none;
  background: #fff;
  color: #666;

  &:hover {
    background: #f5f5f5;
  }
`;

export const TypeFilterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
`;

export const TypeFilterPanel = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 12px;
  z-index: 200;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const TypeFilterOption = styled.div`
  padding: 8px 4px;
  border-bottom: 1px solid #f0f0f0;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const TypeFilterRadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;

  strong {
    display: block;
    font-weight: 600;
    color: #1a1a1a;
  }
`;

export const TypeFilterDescription = styled.span`
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 2px;
`;

export const TypeFilterCloseButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 12px;
  background: #fff;
  color: #1a1a1a;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;
