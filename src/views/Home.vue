<template>
  <div>
    <h1>Vítejte na eshopu</h1>
    <p>Zvolte nějakou kategorii</p>

    <CategoryMenu ></CategoryMenu>
  </div>
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu.vue';
export default {
  components: {
    CategoryMenu,
  },
  name: "Home"
}
</script>

<style scoped>
</style>