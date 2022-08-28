<template>

  <div class="container my-12 mx-auto px-4 md:px-12">
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <div class="flex flex-wrap">
        <div
          v-for="product in products.items"
          :key="product.sku"
          class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
        >
          <div v-if="products.items.length > 0" class="overflow-hidden rounded-lg shadow-lg">
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

      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination" v-if="products.total_count > pageSize">
        <div @click="onFirstPage()" :class="{ disabled: isInFirstPage }" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Na první</span>
          <ChevronDoubleLeftIcon class="h-5 w-5"/>
        </div>
        <div @click="onPrev()" :class="{ disabled: currentPage === 1 }" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Předešlý</span>
          <ChevronLeftIcon class="h-5 w-5"/>
        </div>
        <div class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          v-for="i in pages"
          :key="i"
          :class="{ active: i === currentPage }"
          @click="changePage(i)"
        >
          {{ i }}
        </div>
        <div @click="onNext()" :class="{ disabled: currentPage === totalPages }" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Následující</span>
          <ChevronRightIcon class="h-5 w-5"/>
        </div>
        <div @click="onLastPage(totalPages)" :class="{ disabled: currentPage === totalPages }" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Na poslední</span>
        <ChevronDoubleRightIcon class="h-5 w-5"/>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { PRODUCTS } from '../graphql/products'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/vue/solid'

export default {
  name: 'ProductList',
  components:{
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
  },
  props: {
    id: String,
    title: {
      type: String,
      default: 'Home',
    },
  },
  apollo: {
    products: {
      query: PRODUCTS,
      variables() {
        return {
          id: this.id,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
      },
      update: data => data.products,
    },
  },
  data() {
    return {
      currentPage: 1,
      products: [],
      pageSize: 6,
      numShown: 5
    }
  },
  watch: {
    id(pageId) {
      this.currentPage = 1
      this.$apollo.queries.products.refetch({
        id: pageId,
        currentPage: 1,
        pageSize: this.pageSize,
      })
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.total_count / this.pageSize)
    },
    pages() {
      const numShown = Math.min(this.numShown, this.totalPages);
      let first = this.currentPage - Math.floor(numShown / 2);
      first = Math.max(first, 1);
      first = Math.min(first,this.totalPages - numShown + 1);
      return [...Array(numShown)].map((k,i) => i + first);
    }
  },
  methods: {
    changePage(i) {
      this.products = []
      this.currentPage = i
    },
    onPrev() {
      if (this.currentPage > 1) {
        this.products = []
        this.currentPage--
      }
    },
    onNext() {
      if (this.currentPage < this.totalPages) {
        this.products = []
        this.currentPage++
      }
    },
    onLastPage(totalPages){
      if (this.currentPage < this.totalPages) {
        this.products = []
        this.currentPage =  totalPages
      }
    },
    onFirstPage(){
      if (this.currentPage > 1) {
        this.products = []
        this.currentPage =  1
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

  html {
    scroll-behavior: smooth;
  }
  nav{
    margin:auto;
    }
  .active{
    background-color: rgba(130, 49, 170, 0.11);
    color:$darker-font;
    border:1px solid $light-font;
  }
</style>
