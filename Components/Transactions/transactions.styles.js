import styled, { keyframes } from "styled-components";

export const PageWrapper = styled.div`
  max-width: 420px;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  font-family: Arial, sans-serif;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center; /* Centered since the menu icon is removed */
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

export const Content = styled.div`
  padding: 16px;
`;

export const ControlsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
`;

export const Dropdown = styled.select`
  flex: 1;
  height: 40px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  background: #fff;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Card = styled.div`
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
`;

export const CardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconBox = styled.div`
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  color: #333;
`;

export const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
`;

export const CardMeta = styled.div`
  font-size: 11px;
  color: #666;
`;

export const Amount = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $income }) => ($income ? "#10b981" : "#ef4444")};
`;

export const FooterText = styled.div`
  text-align: center;
  margin-top: 14px;
  font-size: 12px;
  color: #9b9b9b;
`;

export const EmptyWrap = styled.div`
  text-align: center;
  padding: 50px 20px;
`;

export const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 14px;
`;

export const EmptyTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
`;

export const EmptyText = styled.p`
  margin: 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const SkeletonCard = styled.div`
  border: 1px solid #ececec;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SkeletonBlock = styled.div`
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 4px;
`;

export const SkeletonIcon = styled(SkeletonBlock)`
  width: 26px;
  height: 26px;
`;

export const SkeletonLineWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SkeletonLine = styled(SkeletonBlock)`
  height: 10px;
  width: ${({ $w }) => $w || "100%"};
`;

export const SkeletonAmount = styled(SkeletonBlock)`
  width: 52px;
  height: 10px;
`;

export const ListWrapper = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ToggleButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #1a1a1a;
  background: ${({ $isOpen }) => ($isOpen ? "#f5f5f5" : "none")};
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  padding: 0;
`;

export const FormWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

// Delete feature

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
  transition:
    transform 0.1s ease,
    color 0.1s ease;

  &:hover {
    transform: scale(1.1);
    color: #ef4444;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CardRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

export const DeleteModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const DeleteModalContainer = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

export const DeleteConfirmationMessage = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
  color: #333333;
  line-height: 1.5;
`;

export const DeleteModalButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const DeleteModalButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease;

  background-color: ${(props) =>
    props.$variant === "destructive" ? "#ef4444" : "#e5e7eb"};
  color: ${(props) =>
    props.$variant === "destructive" ? "#ffffff" : "#1f2937"};

  &:hover {
    opacity: 0.9;
  }
`;
