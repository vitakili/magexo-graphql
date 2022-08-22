<template>
  <v-app>
    <NavigationMenu/>

    <v-main>
      <v-container>
        <RouterView></RouterView>
      </v-container>
    </v-main>
  </v-app>
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
</style>>
