import { ApolloServer } from "apollo-server-micro";
import { ApolloGateway } from "@apollo/gateway";

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "workspace-service",
      url: "http://workspace-service.workspace-service/graphql",
    },
  ],
});

const server = new ApolloServer({ gateway, subscriptions: false });

export const config = {
  api: {
    bodyParser: false,
    cors: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
