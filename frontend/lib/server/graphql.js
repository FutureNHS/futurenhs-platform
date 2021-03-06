const gql = require("graphql-tag");
const { createClient } = require("urql");

const { requireEnv } = require("./requireEnv");

const getOrCreateUser = async ({ authId, name, emailAddress }) => {
  const client = createClient({
    url: requireEnv("WORKSPACE_SERVICE_GRAPHQL_ENDPOINT"),
  });
  const query = gql`
    mutation($authId: ID!, $name: String!, $emailAddress: String!) {
      getOrCreateUser(
        newUser: { authId: $authId, name: $name, emailAddress: $emailAddress }
      ) {
        id
        name
        authId
        emailAddress
        isPlatformAdmin
      }
    }
  `;

  const result = await client
    .mutation(query, { authId, name, emailAddress })
    .toPromise();
  if (result.error) {
    throw result.error;
  } else {
    return result.data;
  }
};

const getFileDownloadUrl = async ({ authId, fileId }) => {
  const client = createClient({
    url: requireEnv("WORKSPACE_SERVICE_GRAPHQL_ENDPOINT"),
    fetchOptions: {
      headers: {
        "x-user-auth-id": authId,
      },
    },
  });
  const query = gql`
    mutation CreateFileDownloadUrl($id: ID!) {
      fileDownloadUrl(id: $id)
    }
  `;

  const result = await client.query(query, { id: fileId }).toPromise();
  if (result.error) {
    throw result.error;
  } else {
    return result.data;
  }
};

module.exports = {
  getOrCreateUser,
  getFileDownloadUrl,
};
