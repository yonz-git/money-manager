import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const PageWrapper = styled.div`
  max-width: 420px;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  background: transparent !important;
  font-family: Arial, sans-serif;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
  min-height: 60px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: aliceblue;
  text-align: center;
`;

export const StyledLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  position: absolute;
  left: 16px;
`;

export const ToggleButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #1a1a1a;
  background: ${({ $isOpen }) => ($isOpen ? "#fa60e3" : "#ff2a8e")};
  color: #ffffff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    opacity,
    transform 0.2s ease;
  padding: 0;
  position: absolute;
  right: 0px;
`;

export const Content = styled.div`
  padding: 16px;
  background: transparent !important;
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
  background: #a499c4;
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
  border: none;
  border-radius: 4px;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  color: inherit;
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
  color: #ffffff;
`;

export const CardMeta = styled.div`
  font-size: 11px;
  color: #a0a0c0;
  color: #373cba;
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
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  & > * {
    background: #1c0069;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
`;

export const FormWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-left: 1rem;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #2f25c8;
  }

  &:active {
    transform: scale(0.95);
  }
`;

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
    transform 0.3s ease,
    color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #8a0d0d;
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

export const BalanceCard = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto 1.5rem auto;
  padding: 1.5rem;
  border: 1px solid;
  border-radius: 0.75rem;
  text-align: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;

  color: ${(props) =>
    props.$balance > 0
      ? "#16a34a"
      : props.$balance < 0
        ? "#c22323"
        : "#6b7280"};
  border-color: ${(props) =>
    props.$balance > 0
      ? "#22c55e"
      : props.$balance < 0
        ? "#a16868"
        : "#d1d5db"};
  background-color: ${(props) =>
    props.$balance > 0
      ? "#0d3318"
      : props.$balance < 0
        ? "#381010"
        : "#222222"};
`;

export const BalanceLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #cadbff;
  margin-bottom: 0.25rem;
`;

export const BalanceValue = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0;
`;

export const ErrorContainer = styled.div`
  padding: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  text-align: center;
`;

export const ErrorTitle = styled.p`
  color: #991b1b;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const ErrorMessage = styled.p`
  font-size: 14px;
  color: #dc2626;
`;

// Detail Page

export const DetailTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 16px 0 8px;
`;

export const DetailAmount = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ $isIncome }) => ($isIncome ? "#10b981" : "#ef4444")};
  margin: 8px 0;
`;

export const DetailMeta = styled.p`
  font-size: 14px;
  color: #444;
  margin: 6px 0;
`;

export const BackLink = styled.span`
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

export const DetailActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const EditLink = styled.span`
  flex: 1;
  padding: 10px;
  text-align: center;
  border: 1px solid #1a1a1a;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: #1a1a1a;
  background: #fff;
  display: block;
  text-decoration: none;

  &:hover {
    background: #f5f5f5;
  }
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: #ef4444;
  color: #fff;

  &:hover {
    opacity: 0.9;
  }
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const floatAndSpin = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: 0.25; }
  90% { opacity: 0.25; }
  100% {
    transform: translateY(-120vh) rotate(360deg);
    opacity: 0;
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const BackgroundCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, #0a1128, #1c0a35, #0f1c16, #052e16);
  background-size: 400% 400%;
  animation: ${gradientShift} 20s ease infinite;
  overflow: hidden;
  z-index: -1;
`;

export const FloatingSquare = styled.div`
  position: absolute;
  top: 100%;
  background-color: ${(props) => props.color || "#3b82f6"};
  border-radius: 12px;
  box-shadow:
    0 0 10px ${(props) => props.color || "rgba(59, 130, 246, 0.5)"},
    0 0 30px ${(props) => props.color || "rgba(59, 130, 246, 0.3)"};
  filter: blur(1px);
  animation: ${floatAndSpin} ${(props) => props.duration || "15s"} linear
    infinite;
  animation-delay: ${(props) => props.delay || "0s"};
  will-change: transform, opacity;
  width: ${(props) => props.size || "80px"};
  height: ${(props) => props.size || "80px"};
  left: ${(props) => props.left || "10%"};
`;
