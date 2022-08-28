<template>
  <header>
    <nav class="py-3.5 px-6  container">
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <router-link to="/">
          <div class="logo">
              <img src="../assets/logo.svg" alt="logo">
              <h1>Magexo</h1>
          </div>
        </router-link>
      </div>

    <span @click="MenuOpen()" class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4x1">
      <XIcon v-if="open"  class="h-6 w-6"/>
      <MenuIcon v-else class="h-6 w-6" />
    </span>
    <ul class="md:flex md:items-center md:px-0 px-3 md:pb-0 pb-10 md:static absolute md:w-auto w-full top-14 duration-700 ease-in"
    :class="[open ? 'left-0' : 'left-[-100%]']">
      <li class="md:mx-4 md:my-0 my-6" v-for="(category, i) in categories.children" :key="i">
        <router-link
        :to="{
          name: 'Products',
          params: { name: webalize(category.name), id: category.uid, title: category.name },
        }"
        >{{ category.name }}</router-link>
      </li>
    </ul>
    
    </nav>
    </header>
</template>

<script>
import { CATEGORIES } from '../graphql/categories'
import { ref } from 'vue';
import { MenuIcon, XIcon } from "@heroicons/vue/outline"


export default {
  name: 'NavigationMenu',
  components: {
    MenuIcon,
    XIcon,
},
  setup() {
    const open = ref(false);
    const MenuOpen = () => {
      open.value = !open.value
    }
    return{MenuOpen, open }
    },
  apollo: {
    categories: {
      query: CATEGORIES,
      update: (data) => data.categories.items[0]
    }
  },
  methods: {
    webalize (name) {
      return name.split(/[ ,]+/).join('-').toLowerCase()
    }
  },
  data: () => ({
    categories: []
  }),
  mounted () {}
}

</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

  header{
    width: 100%;
    background-color: $bg-color;
    text-transform:uppercase;
    color: $light-font;
    border-image: $border_image 100% 0 stretch;
    border-bottom: 2px solid;
        .logo {
            display:flex;
            font-weight: 700;
            line-height: 2;
            img {
                width: 2rem;
            }
        }
    }
    nav{
      display: flex;
      align-items: center;
       ul{
         background-color: $bg-color;
         z-index:999;
         li{
            font-weight:700;
            color:$light-font;
            padding: 10px 20px;
            position:relative;
            text-align:center;
            border-bottom: 3px solid transparent;
            transition: 0.4s;
              a {
                color: inherit;
                text-decoration: none;
              }
              .active,&:hover {
                background-color: $bg-color;
                border-bottom-color: $light-font;
                cursor: pointer;
              }
        }
       }
    }

</style>>
