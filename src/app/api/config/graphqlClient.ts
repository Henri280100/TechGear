import { GraphQLClient, RequestMiddleware } from "graphql-request";

const endpoint = 'http://localhost:8082/graphql';

const requestLogger: RequestMiddleware = async (request) => {
  console.log('🚀 [GraphQL Request]', request);
  return request;
};

export const graphqlClient = new GraphQLClient(endpoint, {
  requestMiddleware: requestLogger,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});