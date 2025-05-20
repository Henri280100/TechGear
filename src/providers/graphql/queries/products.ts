import { gql } from "graphql-request";

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getAllProducts {
      productId
      name
      productDescription
      features
      brand
      imageUrl
      minPrice
      maxPrice
      availability
      productDetails {
        price
        finalPrice
        colors
        releaseDate
        dayLeft
        detailImageUrl
        warranty
        productStatus
        specification {
          specName
          specValue
          guarantee
        }
      }
      category {
        categoryName
      }
      features
      discounts {
        discountPercentage
      }
    }
  }
`;
