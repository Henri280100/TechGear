import { gql } from "graphql-request";

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      Id
      categoryName
      categoryImage
    }
  }
`;
