import React, { ReactNode } from "react";

import { CloseIcon } from "nhsuk-react-components";
import styled from "styled-components";

import { NavMenuListItem } from ".";

const StyledCloseIconWrapper = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  outline: 4px solid transparent;
  border-bottom: 4px solid transparent;
  height: 40px;
  width: 40px;
  ${({ theme }) => `
    :focus:not(:hover) {
      background-color: ${theme.colorNhsukYellow};
      border-bottom: 4px solid ${theme.colorNhsukBlack};
      svg {
        fill: ${theme.colorNhsukBlack};
      }
    }
    :hover {
      background-color: ${theme.colorShadeNhsukBlue35};
      svg {
        fill: ${theme.colorNhsukWhite};
      }
    }
    :active {
      background-color: ${theme.colorNhsukYellow};
      border-bottom: 4px solid ${theme.colorNhsukBlack};
      svg {
        fill: ${theme.colorNhsukBlack};
      }
    }
  `}
`;

const StyledNavMenuContainer = styled.nav`
  width: 100%;
  right: 0;
  z-index: 10;

  ${({ theme }) => `
    @media (min-width: ${theme.mqBreakpoints.largeDesktop}) {
      max-width: 280px;
      position: absolute;
    }
    background-color: ${theme.colorNhsukWhite};
    border-left: 1px solid ${theme.colorNhsukGrey5};
    border-bottom: 1px solid ${theme.colorNhsukGrey5};
  `}

  // This is the "Menu  X" item that appears only on mobile
  p {
    margin: 0;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: centre;

    ${({ theme }) => `
      @media (min-width: ${theme.mqBreakpoints.largeDesktop}) {
        display: none;
      }
    `}
  }

  span {
    font-weight: 700;
    align-self: center;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  // Hiding the first li item on desktop because it appears in menu bar
  li:first-child {
    ${({ theme }) => `
      @media (min-width: ${theme.mqBreakpoints.largeDesktop}) {
        display: none;
      }
    `}
  }
`;

type NavItems = {
  title: string;
  icon: ReactNode;
  href: string;
  className?: string;
};

interface NavListProps {
  navItems: NavItems[];
  setMenuOpen: (open: boolean) => void;
}

const NavList = ({ navItems, setMenuOpen }: NavListProps) => {
  return (
    <StyledNavMenuContainer className="nav-list">
      <p>
        <span>Menu</span>
        <StyledCloseIconWrapper
          aria-label="close menu"
          onClick={() => setMenuOpen(false)}
        >
          <CloseIcon />
        </StyledCloseIconWrapper>
      </p>
      <ul>
        {navItems.map((item) => {
          return (
            <NavMenuListItem
              title={item.title}
              icon={item.icon}
              href={item.href}
              key={item.title}
              className={item.className}
            />
          );
        })}
      </ul>
    </StyledNavMenuContainer>
  );
};

export default NavList;
