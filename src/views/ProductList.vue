<template>
  <!-- <h2 class="mb-3">Podkategorie</h2>
  <CategoryMenu :parentcategory="String(categoryid)"></CategoryMenu> -->
  
  <!-- <div class="bg-gray-50">
    <div
      class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
       {{createTitle}}
        <br />
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <CategoryMenu/>
        </div>
      </div>
    </div>
  </div> -->

  <div>
  </div>
  <div>
    <div :items="breadcrumbs" large></div>
  </div>
  <div v-if="category !== null && products">
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">


            <div v-if="products.items.length > 0" class="flex flex-wrap">
              <div v-for="product in products.items" :key="product.sku" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                
                <div class="overflow-hidden rounded-lg shadow-lg">
                  <img :src="product.small_image.url" height="450" class="block h-auto w-full" alt="product.name" />
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

        <!-- <div class="container">
          <div class="row">
            <div class="col">
              <div class="text-center">
                <input class="pagination" v-model="page" :length="numberOfTotalPages" @input="changePaging($event)" />
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  <!-- END Column -->
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu.vue'
import {PRODUCTS} from '../graphql/products';


export default {
  name: 'ProductsView',
  components: {
    // CategoryMenu
  },
  props: {
    id: String,
    title: {
      type: String,
      default: 'Home'
    }
  },
  apollo: {
    products: {
      query: PRODUCTS,
      variables () {
        return {
          id: this.id,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      },
      update: (data) => data.products
    }
  },
  data () {
    return {
      currentPage: 1,
      products: [],
      pageSize: 12
    }
  },
  watch: {
    id (newId, oldId) {
      this.currentPage = 1
      this.$apollo.queries.products.refetch({
        id: newId,
        currentPage: 1,
        pageSize: this.pageSize
      })
    }
  },
  computed: {
    createTitle () {
      return this.title.replaceAll('-', ' ')
    },
    totalPages () {
      return Math.ceil(this.products.total_count / this.pageSize)
    }
  },
  methods: {
    changePage (index) {
      this.products = []
      this.currentPage = index
      this.refetch()
    },
    previous () {
      if (this.currentPage > 1) {
        this.products = []
        this.currentPage--
        this.refetch()
      }
    },
    next () {
      if (this.currentPage < this.totalPages) {
        this.products = []
        this.currentPage++
        this.refetch()
      }
    },
    refetch () {
      this.$apollo.queries.products.refetch({
        id: this.id,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
    }
  }
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
