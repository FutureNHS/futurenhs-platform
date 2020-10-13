const gql = require("graphql-tag");
const { createClient } = require("urql");

const { requireEnv } = require("./requireEnv");

const getOrCreateUser = async ({ authId, name }) => {
  const client = createClient({
    url: requireEnv("WORKSPACE_SERVICE_GRAPHQL_ENDPOINT"),
  });
  const query = gql`
    mutation($authId: ID!, $name: String!) {
      getOrCreateUser(newUser: { authId: $authId, name: $name }) {
        id
        name
        authId
        isPlatformAdmin
      }
    }
  `;

  const result = await client.mutation(query, { authId, name }).toPromise();
  if (result.error) {
    throw result.error;
  } else {
    return result.data;
  }
};

module.exports = {
  getOrCreateUser,
};