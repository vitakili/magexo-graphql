<template>
  <div class="top-16">
    <Menu as="div" class="relative inline-block text-left" v-if="categories && categories.items.length > 0">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Kategorie
          <ChevronDownIcon class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
        </MenuButton>
      </div>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem
              v-slot="{ active }"
              v-for="category in categories.items"
              :key="category.uid"
              :value="category"
              as="template"
            >
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <span
                  ><router-link
                    :to="{
                      name: 'ProductsView',
                      params: { name: webalize(category.name), id: category.uid, title: category.name },
                    }"
                    >{{ category.name }}
                  </router-link>
                </span>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { SUBCATEGORY } from '../graphql/subcategory'

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

export default {
  name: 'CategoryMenu',
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon,
  },
  props: {
    mainCat: {
      required: false,
      default: false,
      type: [String, Boolean],
    },
  },
  apollo: {
    categories: {
      query: SUBCATEGORY,
      variables() {
        if (this.mainCat == false) {
          return {
            category_uid: {},
          }
        } else {
          return {
            category_uid: this.mainCat,
          }
        }
      },
    },
  },
  methods: {
    webalize(name) {
      return name.split(/[ ,]+/).join('-').toLowerCase()
    },
  },
}
</script>

<style lang="scss" scoped>
// @import '../assets/_variables.scss';
</style>
