<template>
  <div>
   <div class="bg-gray-50">
    <div
      class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
       {{updateTitle}}
        <br />
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0  justify-end">
        <SelectMenu
        v-on:select-option="updatePageSize"
        :options="this.options"
        >
      </SelectMenu>
        <CategoryMenu :mainCat="String(id)"></CategoryMenu>
      </div>
    </div>
  </div>
      <div class="container">
          <ProductList       
              :id="this.id"
              :title="this.title"
              :name="updateTitle"
              :selected="selected"
              >
          </ProductList>
      </div>
</div>

</template>

<script>
import ProductList from '@/components/ProductList.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
import SelectMenu from '@/components/SelectMenu.vue'
import { useRoute } from "vue-router"
export default {
  name: 'ProductsView',
  components: {
    ProductList,
    CategoryMenu,
    SelectMenu
  },
  setup(){
    if(!!useRoute().params.id){ 
      localStorage.setItem("cat_id",useRoute().params.id)
    }
  },
  data () {
    return {
      id: localStorage.getItem("cat_id"),
      title: useRoute().params.name,
      options : [
        6,
        12,
        24,
        36
      ], 
      selected: this.selected  
    }
  },
  methods: {
    updatePageSize(selectedOption) {
      this.selected = selectedOption;
    }
  },
  computed: {
    updateTitle () {
      const str = this.title.replaceAll('-', ' ')
      return  str.charAt(0).toUpperCase() + str.slice(1)
    },
  }
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>