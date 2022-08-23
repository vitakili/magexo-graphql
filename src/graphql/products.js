import gql from 'graphql-tag';

export const PRODUCTS = gql`
  query ($id: String!, $currentPage: Int!, $pageSize: Int!) {
    products(
      filter: { category_uid: { eq: $id } }
      currentPage: $currentPage
      pageSize: $pageSize
    ) {
      total_count
      items {
        name
        sku
        small_image {
          url
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`