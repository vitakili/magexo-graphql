<template>
  
   <div class="bg-gray-50">
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
        <CategoryMenu :mainCat="String(id)"></CategoryMenu>
      </div>
    </div>
  </div>
      <div class="container">

          <ProductList       
              :id="this.id"
              :title="this.title"
              >
          </ProductList>
      </div>


</template>

<script>
import ProductList from '@/components/ProductList.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
import { useRoute } from "vue-router"

export default {
  name: 'Products',
  components: {
    ProductList,
    CategoryMenu
  },
  // watch: {
  //   useRoute() {
  //     const id = route.params.id;
  //     const title = route.params.title;
  //   }
  // },
  data () {
    return {
      id: useRoute().params.id,
      title: useRoute().params.name
    }
  },

  computed: {
    createTitle () {
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
