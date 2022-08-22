<template>
  <h2 class="mb-3">Podkategorie</h2>
  <CategoryMenu :parentcategory="String(categoryid)"></CategoryMenu>
  <div>
    <div :items="breadcrumbs" large></div>
  </div>
  <div v-if="category !== null && products">
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">


            <div v-if="products.items.length > 0" class="flex flex-wrap">
              <div v-for="product in products.items" :key="product.sku" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                
                <div class="overflow-hidden rounded-lg shadow-lg">
                  <img :src="product.image.url" height="450" class="block h-auto w-full" alt="product.name" />
                  <div class="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                      <a class="no-underline hover:underline text-black" href="#">
                        {{ product.name }}
                      </a>
                    </h1>
                    <p class="text-grey-darker text-sm">
                      {{ product.price_range.minimum_price.regular_price.value }}
                      {{ product.price_range.minimum_price.regular_price.currency }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-else>žádné produkty</div>

      </div>

        <div class="container">
          <div class="row">
            <div class="col">
              <div class="text-center">
                <input class="pagination" v-model="page" :length="numberOfTotalPages" @input="changePaging($event)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- END Column -->
</template>

<script>
import gql from 'graphql-tag'
import CategoryMenu from '@/components/CategoryMenu.vue'

export default {
  name: 'ProductList',
  components: {
    CategoryMenu,
  },
  data: function () {
    return {
      categoryid: null,
      page: 1,
      pagesize: 9,
    }
  },
  watch: {
    $route(to) {
      this.categoryid = to.params.id
      this.page = parseInt(to.params.page)
    },
  },
  mounted() {
    this.categoryid = this.$route.params.id
    this.page = parseInt(this.$route.params.page)
  },
  methods: {
    changePaging: function (page) {
      this.$router.push({ params: { page: page } })
      window.scrollTo(0, 0, { behavior: 'smooth' })
    },
  },
  computed: {
    numberOfTotalPages: function () {
      if (this.products) {
        return Math.ceil(this.products.total_count / this.pagesize)
      }
      return 0
    },
    breadcrumbs: function () {
      let items = [{ text: 'Domů', href: '/' }]
      let br = this.category.breadcrumbs
      for (let i in br) {
        let breadcrumb = br[i]
        items.push({ text: breadcrumb.category_name, href: '/category/' + breadcrumb.category_id + '/1' })
      }
      items.push({ text: this.category.name })
      return items
    },
  },
  apollo: {
    category: {
      query: gql`
        query example($id: Int) {
          category(id: $id) {
            id
            level
            name
            breadcrumbs {
              category_id
              category_name
              category_level
              category_url_key
              category_url_path
            }
          }
        }
      `,
      variables() {
        return {
          id: this.categoryid,
        }
      },
    },
    products: {
      query: gql`
        query example($category: String, $page: Int, $pagesize: Int) {
          products(filter: { category_id: { eq: $category } }, pageSize: $pagesize, currentPage: $page) {
            items {
              name
              sku
              image {
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
            total_count
          }
        }
      `,
      variables() {
        return {
          category: this.categoryid,
          page: this.page,
          pagesize: this.pagesize,
        }
      },
    },
  },
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
