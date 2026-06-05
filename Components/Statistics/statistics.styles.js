import styled from "styled-components";
import Link from "next/link";

export const StatsHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
`;

export const StatsTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: aliceblue;
`;

export const MonthNavigator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const NavButton = styled.button`
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  font-size: 16px;
  cursor: pointer;
  color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const MonthLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: aliceblue;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
`;

export const SummaryCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  grid-column: ${({ $full }) => ($full ? "1 / -1" : "auto")};
`;

export const SummaryLabel = styled.p`
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 4px;
`;

export const SummaryValue = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: ${({ $positive, $negative }) =>
    $positive ? "#10b981" : $negative ? "#ef4444" : "#fff"};
`;

export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 20px 0 10px;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;
`;

export const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 100px;
`;

export const CategoryName = styled.span`
  font-size: 12px;
  color: aliceblue;
`;

export const BarWrapper = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const Bar = styled.div`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color || "#ef4444"};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const CategoryAmount = styled.span`
  font-size: 12px;
  color: ${({ $color }) => $color || "#ef4444"};
  min-width: 60px;
  text-align: right;
`;

export const MonthList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

export const MonthRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: ${({ $active }) =>
    $active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"};
`;

export const MonthRowLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: aliceblue;
  flex: 1;
`;

export const MonthRowMeta = styled.span`
  font-size: 11px;
  color: #9ca3af;
`;

export const MonthRowBalance = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $positive }) => ($positive ? "#10b981" : "#ef4444")};
  min-width: 70px;
  text-align: right;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 30px 0;
  color: #9ca3af;
  font-size: 14px;
`;

export const BackToHome = styled(Link)`
  display: inline-block;
  margin-top: 16px;
  font-size: 14px;
  color: aliceblue;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
