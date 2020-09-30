import React, { FC, ReactNode } from "react";

import Link from "next/link";
import styled from "styled-components";

import { Folder } from "../../lib/generated/graphql";

type ListItem = Pick<Folder, "id" | "title">;

interface Props {
  active: boolean;
  altText: string;
  item: ListItem;
  imgSrc: string;
  className?: string;
  href: string;
  menu?: ReactNode;
}

const ListItem = styled.li`
  list-style-type: none;
  margin-bottom: 12px;
  display: flex;
`;

const LinkWrapper = styled.div<{ active: boolean }>`
  display: flex;
  background: ${({ active, theme }) =>
    active ? theme.colorNhsukYellow : "inherit"};
  border-radius: 4px;
  width: 227px;
  margin-right: 4px;
  font-weight: ${({ active }) => (active ? 700 : "inherit")};
  &:hover {
    ${({ theme }) => `
    background-color: ${theme.colorNhsukGrey4};
    + div {
      border-radius: 4px;
      background-color: ${theme.colorNhsukGrey4};
      button {
        opacity: 1;
        color: ${theme.colorNhsukWhite};
      }
    }
  `}
  }
  a {
    flex-grow: 2;
    display: flex;
    padding-left: 8px;
    text-decoration: none;
    align-self: flex-start;
    &:focus {
      box-shadow: none;
    }
  }
  img {
    padding-top: 2px;
    align-self: baseline;
    /* stop things jumping about while svgs load */
    width: 24px;
    flex-shrink: 0;
  }
  div {
    padding-left: 4px;
    padding-right: 4px;
    ${({ theme }) => `
    color: ${theme.colorNhsukBlack};
  `}
  }
`;

const NavListItem: FC<Props> = ({
  active,
  altText,
  item,
  imgSrc,
  className,
  href,
  menu,
}: Props) => {
  return (
    <ListItem className={className}>
      <LinkWrapper active={active}>
        <Link href={href}>
          <a>
            <img src={imgSrc} alt={altText} />
            <div>{item.title}</div>
          </a>
        </Link>
      </LinkWrapper>
      {menu}
    </ListItem>
  );
};

export default NavListItem;
