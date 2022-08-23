import gql from "graphql-tag";

export const CATEGORIES = gql`query
    CATEGORIES($filters: CategoryFilterInput){
  categories(
    filters: $filters
    pageSize:20,
    currentPage: 1
  ) {
    total_count
    items {
      id
      uid
      level
      name
      path
      children_count
      children {
        uid
        level
        name
        path
        children_count
        children {
          uid
          level
          name
          path
        }
      }
    }
    page_info {
      current_page
      page_size
      total_pages
    }
  }
}
`