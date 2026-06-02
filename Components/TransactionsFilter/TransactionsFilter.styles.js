import styled from "styled-components";

export const FilterButton = styled.button`
  width: 100%;
  height: 40px;
  padding: 0 14px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  background: ${({ $isActive }) => ($isActive ? "#1a1a1a" : "#fff")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#1a1a1a")};
  border: 1px solid ${({ $isActive }) => ($isActive ? "#1a1a1a" : "#bdbdbd")};
  transition:
    background 0.2s,
    color 0.2s;
`;

export const FilterPanel = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 12px;
  z-index: 100;
  min-width: 200px;
`;

export const FilterOption = styled.div`
  padding: 4px 0;
`;

export const FilterRadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
`;

export const FilterActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
`;

export const FilterApplyButton = styled.button`
  flex: 1;
  height: 34px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const FilterClearButton = styled.button`
  flex: 1;
  height: 34px;
  background: #fff;
  color: #666;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
`;

export const FilterWrapper = styled.div`
  position: relative;
  flex: 1;
`;
