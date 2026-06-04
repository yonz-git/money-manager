import Link from "next/link";
import { useRouter } from "next/router";
import { StyledNav, NavList, NavItem } from "./BottomNav.styles";

export default function NavBar() {
  const router = useRouter();

  return (
    <StyledNav>
      <NavList>
        <NavItem className={router.pathname === "/" ? "active" : ""}>
          <Link href="/">Home</Link>
        </NavItem>
        <NavItem
          className={router?.pathname.includes("/statistics") ? "active" : ""}
        >
          <Link href="/statistics">Statistics</Link>
        </NavItem>
      </NavList>
    </StyledNav>
  );
}
