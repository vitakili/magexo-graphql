<template slot-scope="{ result: { loading, error, data} }">

  <div class="container my-12 mx-auto px-4 md:px-12">
    <div v-if="$apollo.loading" class="flex items-center justify-center">
      <button type="button"
      class="inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-violet-500 rounded-md shadow cursor-not-allowed hover:bg-violet-500"
      disabled="">
        <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        Načítám...
     </button>
    </div>
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

      <div 
        v-if="totalPages > 1" 
        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px paginated" 
        aria-label="Pagination" 
        >
        <div @click="onFirstPage()" :class="{ disabled: currentPage === 1 }" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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
          @click="i !== currentPage ? changePage(i) : ''"
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
      </div>
    </div>
    {{pagedForYou}}
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
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
    name: String,
    selected: {
      type:Number,
      default: 6
    }
  },
  apollo: {
    products: {
      query: PRODUCTS,
      variables() {
        return {
          id: this.id,
          currentPage: this.currentPage,
          pageSize: this.selected,
        }
      },
    },
  },
  data() {
    return {
      currentPage: this.currentPage,
      products: [],
      pageSize: this.selected,
      numShown: 5,
    }
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch('pagination/changePage', 1)
    },
    id(newId, oldId) {
      this.currentPage = 1
      this.$apollo.queries.products.refetch({
        id: newId,
        currentPage: this.currentPage,
        pageSize: this.selected,
        }
      )
    },
  },
  computed: {
    ...mapGetters('pagination',[
      'getCurrentPage'
    ]),
    ...mapState([
      'pagination'
    ]),
    totalPages() {
      return Math.ceil(this.products.total_count / this.selected)
    },
    pages() {
      let numShown = Math.min(this.numShown, this.totalPages);
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
      this.$store.dispatch('pagination/changePage', i)
    },
    onPrev() {
      if (this.currentPage > 1) {
        this.products = []
        this.currentPage--
        this.$store.dispatch('pagination/onPrev')
      }
    },
    onNext() {
      if (this.currentPage < this.totalPages) {
        this.products = []
        this.currentPage++
        this.$store.dispatch('pagination/onNext')
      }
    },
    onLastPage(totalPages){
      if (this.currentPage < this.totalPages) {
        this.products = []
        this.currentPage =  totalPages
        this.$store.dispatch('pagination/onLastPage', totalPages)
      }
    },
    onFirstPage(){
      if (this.currentPage > 1) {
        this.products = []
        this.currentPage =  1
        this.$store.dispatch('pagination/onFirstPage')
      }
    }
  },
  mounted() {
    this.currentPage = this.getCurrentPage;
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

  html {
    scroll-behavior: smooth;
  }
  .paginated {
    margin: auto;
  }
  .active{
    background-color: rgba(130, 49, 170, 0.11);
    color:$darker-font;
    border:1px solid $light-font;
  }
</style>
