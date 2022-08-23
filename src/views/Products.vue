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
        <div class="inline-flex rounded-md shadow">
        <CategoryMenu :parentcategory="String(categoryid)"></CategoryMenu>
        </div>
      </div>
    </div>
  </div>
      <div class="container">

          <ProductList       
              :id="id"
              :title="title"
              >
          </ProductList>
      </div>


</template>

<script>
import ProductList from '@/components/ProductList.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'


export default {
  name: 'Products',
  components: {
    ProductList,
    CategoryMenu
  },
  watch: {
    '$route.params.id': function () {
      this.id = this.$route.params.id
      this.title = this.$route.params.title
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      title: this.$route.params.name
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
