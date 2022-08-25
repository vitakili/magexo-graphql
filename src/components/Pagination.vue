<template>
      <nav v-if="data.length > 6 || currentPage > 1" class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <div @click="onClickFirstPage()" :class="{ disabled: isInFirstPage }" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Na první</span>
          <ChevronDoubleLeftIcon class="h-5 w-5"/>
        </div>
        <div @click="onClickPreviousPage()" :class="{ disabled: isInFirstPage }" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Předešlý</span>
          <ChevronLeftIcon class="h-5 w-5"/>
        </div>
        <div class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          v-for="(page, index) in totalPages"
          :key="index"
          :class="{ active: isPageActive(page.number) }"
          @click="onClickPage(page.number)"
        >
          {{ page.number }}
        </div>
        <div @click="onClickNextPage()" :class="{ disabled: isInLastPage }" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Následující</span>
          <ChevronRightIcon class="h-5 w-5"/>
        </div>
        <div @click="onClickLastPage()" :class="{ disabled: isInLastPage }" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Na poslední</span>
          <ChevronDoubleRightIcon class="h-5 w-5"/>
        </div>
      </nav>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from '@heroicons/vue/solid'

export default {
  name: 'Pagination',
  components:{
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage -1) * this.perPage, end = start + this.perPage
      return this.data.slice(start,end)
    },
    startPage() {
      if(this.currentPage === 1) return 1
      if(this.currentPage === this.totalPages) return this.totalPages - this.maxVisibleButtons + (this.maxVisibleButtons - 1)
      return this.currentPage -1
    },
    endPage() { return Math.min(this.startPage + this.maxVisibleButtons -1, this.totalPages)},
    pages() {
      const range = []
      for (const i = this.startPage; i < this.endPage; i+= 1){
        range.push({
          number: i,
          isDisabled: i === this.currentPage
        });
      }
      return range
    },
    isInFirstPage() { return this.currentPage === 1},
    isInLastPage() { return this.currentPage === this.totalPages}
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage +1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
    onPageChange(page) {
      this.currentPage = page
    }
  }
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
