// GraphQL query function

import { graphqlClient } from "@/app/api/config/graphqlClient";
import { DocumentNode } from "graphql";

// This function is used to make GraphQL queries using the graphql-request library
export const graphqlQuery = async <T>(
  query: DocumentNode,
  variables?: Record<string, unknown>
): Promise<T> => {
  try {
    return await graphqlClient.request<T>(query, variables);
  } catch (error) {
    console.error("GraphQL error:", error);
    throw error;
  }
}