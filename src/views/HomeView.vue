<template>
  <div class="bg-gray-50">
    <div
      class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        Co na sebe?
        <br />
        <span class="light-text">Zde si vybere každá</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0 justify-end">
          <CategoryMenu/>
      </div>
    </div>
  </div>
  
    <div class="container">
      <ProductList 
          :id="defaultId"
          :name="name"
          >
      </ProductList>
    </div>
</template>

<script>
import { DEFAULT_CAT } from '../graphql/defaultcat';
import CategoryMenu from '@/components/CategoryMenu.vue';
import ProductList from '@/components/ProductList.vue';

export default {
  components: {
    CategoryMenu,
    ProductList
  },
  name: "HomeView",
  aapollo: {
    defaultId: {
      query: DEFAULT_CAT,
      update: (data) => data.categories.items[0].title
    }
  },
  data: () => ({
    defaultId: '',
    name:'Default'
  })
}
</script>

<style lang="scss">
@import '../assets/_variables.scss';

.light-text{
  color:$light-font;
}
.darker-text{
  color:$darker-font;
}

</style>