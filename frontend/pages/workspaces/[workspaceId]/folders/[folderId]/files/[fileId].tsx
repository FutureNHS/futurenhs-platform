import React from "react";

import { useRouter } from "next/router";
import styled from "styled-components";

import {
  MobileFileList,
  FileTable,
} from "../../../../../../components/FileTable";
import { Head } from "../../../../../../components/Head";
import { MainHeading } from "../../../../../../components/MainHeading";
import { NavHeader } from "../../../../../../components/NavHeader";
import { Navigation } from "../../../../../../components/Navigation";
import { PageLayout } from "../../../../../../components/PageLayout";
import {
  useGetWorkspaceByIdQuery,
  useGetFileByIdQuery,
} from "../../../../../../lib/generated/graphql";
import withUrqlClient from "../../../../../../lib/withUrqlClient";

const PageContent = styled.section`
  flex-grow: 3;
  min-height: 100vh;
  padding-top: 24px;
  padding-left: 10%;
  padding-right: 10%;
  ${({ theme }) => `
  background-color: ${theme.colorNhsukWhite};
  `}
`;
const ContentWrapper = styled.div`
  display: flex;
`;

const Description = styled.p`
  padding-bottom: 40px;
`;

const FileHomepage = () => {
  const router = useRouter();
  let { workspaceId, folderId, fileId } = router.query;
  workspaceId = (workspaceId || "unknown").toString();
  folderId = (folderId || "unknown").toString();
  fileId = (fileId || "unknown").toString();

  const [workspace] = useGetWorkspaceByIdQuery({
    variables: { id: workspaceId },
  });

  const [file] = useGetFileByIdQuery({
    variables: { id: fileId },
  });

  return (
    <>
      <Head title={`File - ${file.data?.file.title || "Loading..."}`} />
      <PageLayout>
        <NavHeader />
        <ContentWrapper>
          <Navigation
            workspaceId={workspaceId}
            workspaceTitle={workspace.data?.workspace.title || "unknown"}
            activeFolder={folderId}
          />
          <PageContent>
            <MainHeading withBorder>
              {file.data?.file.title || "Loading..."}
            </MainHeading>
            <h2>Description</h2>
            <Description>
              {file.data?.file.description || "Loading..."}
            </Description>
            <h3>File</h3>
            {file.error && <p> Oh no... {file.error?.message} </p>}
            {file.fetching || !file.data ? (
              "Loading..."
            ) : (
              <>
                <MobileFileList
                  files={[file.data.file]}
                  workspaceId={workspaceId}
                  titleLink={false}
                />
                <FileTable
                  files={[file.data.file]}
                  workspaceId={workspaceId}
                  titleLink={false}
                />
              </>
            )}
          </PageContent>
        </ContentWrapper>
      </PageLayout>
    </>
  );
};

export default withUrqlClient(FileHomepage);