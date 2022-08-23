import gql from "graphql-tag";

export const DEFAULT_CAT = gql`
query {
  categories(pageSize: 1) {
    total_count
    items {
      uid
      children_count
    }
  }
}
`