import React from "react";

import Link from "next/link";
import { Header } from "nhsuk-react-components";
import styled from "styled-components";

import { FnhsLogo } from "../Svg";

const StyledHeader = styled(Header)`
  ${({ theme }) => `
    background-color: ${theme.colorNhsukWhite};
  `}
`;

const StyledHeaderContainer = styled.div`
  padding: 20px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    right: 0;
  }

  ${({ theme }) => `
    background-color: ${theme.colorNhsukBlue};

    @media (min-width: ${theme.mqBreakpoints.largeDesktop}) {
      background-color: ${theme.colorNhsukWhite};

      .nhsuk-header__menu {
        position: absolute;
      }
    }
  `}
`;

const StyledHeaderLogo = styled(Header.Logo)`
  display: none;
  ${({ theme }) => `
    @media (min-width: ${theme.mqBreakpoints.largeDesktop}) {
      display: block;
    }
  `}
`;

const StyledIcon = styled.img`
  max-height: 20px;
  max-width: 20px;
  margin-right: 18px;
`;

const StyledSvgIcon = styled.svg.attrs({
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
})`
  height: 20px;
  width: 20px;
  margin-right: 18px;
  ${({ theme }) => `
    color: ${theme.colorNhsukBlue};

    @media (min-width: ${theme.mqBreakpoints.largeDesktop}) {
      color: ${theme.colorNhsukWhite};
      margin-right: 10px;
    }
  `}
`;

const StyledHeaderNav = styled(Header.Nav)`
  ${({ theme }) => `
      @media (min-width: ${theme.mqBreakpoints.tablet}) {
        max-width: none;
      }
  `}
`;

const StyledHeaderNavItem = styled(Header.NavItem)`
  a {
    display: flex;
    align-items: center;
  }

  ${({ theme }) => `
    @media (min-width: ${theme.mqBreakpoints.largeDesktop}) {
      #nav-item-hide {
        display: none;
      }
    }
  `}
`;

const NavHeader = () => {
  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <FnhsLogo />
        <StyledHeaderLogo href="https://www.nhs.uk" />
        <Header.MenuToggle />
      </StyledHeaderContainer>
      <StyledHeaderNav>
        <Link href="/workspaces/directory" passHref>
          <StyledHeaderNavItem>
            <StyledSvgIcon viewBox="0 0 20 16">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.240284 5.48644C0.0173271 5.39274 0 5.18487 0 5.1234C0 5.06192 0.0173271 4.85406 0.240284 4.76034L9.04547 1.05931C9.34944 0.931543 9.67059 0.86676 10 0.86676C10.3294 0.86676 10.6506 0.931543 10.9545 1.05931L19.7597 4.76034C19.9827 4.85406 20 5.06192 20 5.1234C20 5.18487 19.9827 5.39274 19.7597 5.48644L10.9545 9.18748C10.6506 9.31524 10.3294 9.38002 10 9.38002C9.67059 9.38002 9.34944 9.31524 9.04547 9.18748L0.240284 5.48644ZM19.7597 11.2471C19.9827 11.3408 20 11.5487 20 11.6101C20 11.6716 19.9827 11.8795 19.7597 11.9732L10.9545 15.6742C10.6506 15.802 10.3294 15.8668 10 15.8668C9.67059 15.8668 9.34944 15.802 9.04547 15.6742L0.240284 11.9732C0.0173271 11.8795 0 11.6716 0 11.6101C0 11.5487 0.0173271 11.3408 0.240284 11.2471L2.5921 10.2586L8.85456 12.8908C9.22103 13.0448 9.61051 13.1219 10 13.1219C10.3895 13.1219 10.779 13.0448 11.1454 12.8908L17.4079 10.2586L19.7597 11.2471ZM19.7597 8.72981L10.9545 12.4308C10.6506 12.5586 10.3294 12.6234 10 12.6234C9.67059 12.6234 9.34944 12.5586 9.04547 12.4308L0.240284 8.72981C0.0173271 8.63611 0 8.42824 0 8.36677C0 8.30529 0.0173271 8.09743 0.240284 8.00371L2.5921 7.01518L8.85456 9.64745C9.22103 9.80148 9.61051 9.8785 10 9.8785C10.3895 9.8785 10.779 9.80148 11.1454 9.64745L17.4079 7.01518L19.7597 8.00371C19.9827 8.09743 20 8.30529 20 8.36677C20 8.42824 19.9827 8.63611 19.7597 8.72981Z"
                fill="currentColor"
              />
            </StyledSvgIcon>
            My workspaces
          </StyledHeaderNavItem>
        </Link>
        <StyledHeaderNavItem
          // Temporary id added to enable hiding for now
          id="nav-item-hide"
          href="#"
        >
          <StyledIcon
            src={require("../../public/icons/dashboard.svg")}
            alt=""
          />
          My dashboard
        </StyledHeaderNavItem>
        <StyledHeaderNavItem id="nav-item-hide" href="#">
          <StyledIcon
            src={require("../../public/icons/notifications.svg")}
            alt=""
          />
          Notifications
        </StyledHeaderNavItem>
        <StyledHeaderNavItem id="nav-item-hide" href="#">
          <StyledIcon src={require("../../public/icons/profile.svg")} alt="" />
          View profile
        </StyledHeaderNavItem>
        <StyledHeaderNavItem id="nav-item-hide" href="#">
          <StyledIcon src={require("../../public/icons/help.svg")} alt="" />
          Help
        </StyledHeaderNavItem>
        <StyledHeaderNavItem id="nav-item-hide" href="#">
          <StyledIcon src={require("../../public/icons/log-out.svg")} alt="" />
          Log out
        </StyledHeaderNavItem>
      </StyledHeaderNav>
    </StyledHeader>
  );
};

export default NavHeader;