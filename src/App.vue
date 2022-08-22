<template>
    <NavigationMenu/>
      <div class="container">
        <RouterView></RouterView>
      </div>
</template>

<script>
import NavigationMenu from '@/components/NavigationMenu.vue';
export default {
    name: "App",
    data: () => ({
    //
    }),
    components: { NavigationMenu }
};
</script>

<style lang="scss">
@import './assets/_variables.scss';
  * {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
  }

  body {
    font-family: 'fira', sans-serif
  }
  .container {
    max-width: 1170px;
    margin-left:auto;
    margin-right:auto;
  }
</style>>
