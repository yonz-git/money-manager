import styled from "styled-components";

export const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #ffd4f9;
  background: linear-gradient(
    1deg,
    rgba(255, 212, 249, 1) 0%,
    rgba(255, 159, 242, 1) 100%
  );
`;

export const NavList = styled.ul`
  display: flex;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &.active {
    background: #da24c2;
    background: linear-gradient(
      1deg,
      rgba(218, 36, 194, 1) 0%,
      rgba(255, 133, 239, 1) 100%
    );
    font-weight: bold;
  }

  &:hover {
    background: #da24c2;
    background: linear-gradient(
      1deg,
      rgba(218, 36, 194, 1) 100%,
      rgba(255, 133, 239, 1) 0%
    );
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
  }
`;
