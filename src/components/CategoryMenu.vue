<template>

  <div v-if="categories && categories.items.length > 0">
      <div
          v-for="category in categories.items" :key="category.uid"
      >
        <router-link :to="'/category/' + category.id + '/1'">{{category.name}}</router-link>
      </div>
  </div>
  <div v-else>
    Žádné podkategorie <br>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "CategoryMenu",
  props: {
    parentcategory: {
      required: false,
      default: false,
      type: [String, Boolean]
    }
  },
  apollo: {
    categories: {
      query: gql`query
        example($filters: CategoryFilterInput){
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
      `,
      variables(){
          if(this.parentcategory == false){
            return {
              filters: {}
            }
          }else{
            return {
              filters: {
                parent_id: {in: [this.parentcategory]}
              }
            }
          }
      }
    },
  },
}
</script>

<style scoped>
</style>