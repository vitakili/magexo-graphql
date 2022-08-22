 import gql from 'graphql-tag'

 export const GET_PRODUCT_DETAIL_FOR_PRODUCT_PAGE = gql`
 query getProductDetailForProductPage {
  products (search: "Gloria") {
    items {
      name
      sku
      price_range {
        minimum_price {
          discount {
            percent_off
            amount_off
          }
          final_price {
            value
            currency
          }
          regular_price {
            value
          }
        }
      }
    }
  }
}`