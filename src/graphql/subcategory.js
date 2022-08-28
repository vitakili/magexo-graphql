import gql from "graphql-tag";

export const SUBCATEGORY = gql`query
    SUBCATEGORY($category_uid: [String] ){
        categories(
            filters: {
                parent_category_uid: {in: $category_uid }
            }
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