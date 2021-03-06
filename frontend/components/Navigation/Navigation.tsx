import React, { FC } from "react";

import Link from "next/link";
import styled from "styled-components";

import { useFoldersByWorkspaceQuery } from "../../lib/generated/graphql";
import { DeleteIcon, EditIcon, MoveIcon, UploadIcon } from "../Icon";
import { Menu, MenuItem } from "../Menu";
import { NavListItem } from "../NavListItem";
import { NavSection } from "../NavSection";

const Nav = styled.nav`
  display: none;
  padding-top: 24px;
  padding-right: 52px;
  padding-left: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;
  width: 270px;
  ${({ theme }) => `
    @media (min-width: ${theme.mqBreakpoints.largeDesktop}) {
      display: block;
      width: 360px;
    }
  `}
`;

const Header = styled.header`
  padding-bottom: 24px;
`;

const WorkspaceTitleLink = styled.a`
  text-decoration: none;
  h3 {
    width: fit-content;
    margin-bottom: 8px;
    border-bottom: 4px solid transparent;
    ${({ theme }) => `
      color: ${theme.colorNhsukBlue};
    `}
  }
  &:focus > h3 {
    ${({ theme }) => `
      color: ${theme.colorNhsukBlack};
      background-color: ${theme.colorNhsukYellow};
      border-bottom: 4px solid ${theme.colorNhsukBlack};
    `}
  }
  &:hover:not(:focus) > h3 {
    ${({ theme }) => `
      color: ${theme.colorNhsukPurple};
      text-decoration: underline;
    `}
  }
  &:visited {
    color: inherit;
  }
`;

const List = styled.ul`
  padding-left: 0px;
  margin-bottom: 40px;
  .nav-list-item {
    div {
      font-weight: 700;
      ${({ theme }) => `
      color: ${theme.colorNhsukBlue}`}
    }
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const LinkListItem = styled.li`
  list-style-type: none;
  font-size: 16px;

  a {
    :hover:not(:focus) {
      ${({ theme }) => `
        color: ${theme.colorNhsukPurple};
        text-decoration: underline;
      `}
    }
    ${({ theme }) => `
      text-decoration: none;
      color: ${theme.colorNhsukBlue}
    `}
  }
`;

interface Props {
  workspaceId: string;
  workspaceTitle: string;
  activeFolder?: string;
}

const Navigation: FC<Props> = ({
  workspaceId,
  workspaceTitle,
  activeFolder,
}) => {
  const [{ data, fetching, error }] = useFoldersByWorkspaceQuery({
    variables: { workspace: workspaceId },
  });

  if (fetching || !data) return <p>Loading...</p>;
  if (error) return <p> Oh no... {error?.message} </p>;

  const createFolder = {
    id: "create-folder",
    title: "Create new folder",
    description: "create folder",
    workspace: workspaceId,
  };

  const icons: { [key: string]: string } = {
    closed: require("../../public/folderClosed.svg"),
    open: require("../../public/folderOpen.svg"),
  };

  const alphabetisedFolders = [...data.foldersByWorkspace].sort((a, b) =>
    a.title.localeCompare(b.title, "en", { sensitivity: "base" })
  );

  return (
    <Nav>
      <Header>
        <Link href={`/workspaces/${workspaceId}`} passHref>
          <WorkspaceTitleLink>
            <h3>{workspaceTitle}</h3>
          </WorkspaceTitleLink>
        </Link>
        <LinkList>
          <LinkListItem>
            <Link href={`/workspaces/${workspaceId}`} passHref>
              <a>About this workspace</a>
            </Link>
          </LinkListItem>
          <LinkListItem>
            <Link href={`/workspaces/${workspaceId}/members`} passHref>
              <a>View members</a>
            </Link>
          </LinkListItem>
        </LinkList>
      </Header>
      <NavSection title="Folders">
        <List>
          <NavListItem
            active={createFolder.id === activeFolder}
            item={createFolder}
            imgSrc={require("../../public/createFolder.svg")}
            className="nav-list-item"
            href={`/workspaces/${workspaceId}/folders/${createFolder.id}`}
            altText=""
          />
          {alphabetisedFolders.map((folder) => {
            const items: MenuItem[] = [
              {
                title: "Upload files to this folder",
                icon: <UploadIcon />,
                handler: `/workspaces/${workspaceId}/folders/${folder.id}/upload-file`,
              },
              {
                title: "Edit folder details",
                icon: <EditIcon />,
                handler: `/workspaces/${workspaceId}/folders/${folder.id}/update-folder`,
              },
              {
                title: "Move folder",
                icon: <MoveIcon />,
                handler: "#",
              },
              {
                title: "Delete folder",
                icon: <DeleteIcon />,
                handler: "#",
              },
            ];
            return (
              <NavListItem
                active={folder.id === activeFolder}
                key={folder.id}
                item={folder}
                imgSrc={
                  folder.id === activeFolder ? icons["open"] : icons["closed"]
                }
                altText={
                  folder.id === activeFolder ? "folder current page" : "folder"
                }
                href={`/workspaces/${workspaceId}/folders/${folder.id}`}
                menu={
                  <Menu
                    background="dark"
                    items={items}
                    hiddenUntilHover={true}
                  />
                }
              />
            );
          })}
        </List>
      </NavSection>
    </Nav>
  );
};

export default Navigation;
