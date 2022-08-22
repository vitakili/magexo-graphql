<template>

  <div class="top-16 w-72">
    <Listbox>
      <div class="relative mt-1">
        <div v-if="categories && categories.items.length > 0">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">Zvolte kategorii</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="category in categories.items" 
              :key="category.uid"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'li-option' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  ><router-link :to="'/category/' + category.id + '/1'">{{category.name}}</router-link></span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
          </div>
            <div v-else>
              Žádné podkategorie <br>
            </div>
      </div>
    </Listbox>
  </div>


  <!-- <div v-if="categories && categories.items.length > 0">
      <div
          v-for="category in categories.items" :key="category.uid"
      >
        <router-link :to="'/category/' + category.id + '/1'">{{category.name}}</router-link>
      </div>
  </div>
  <div v-else>
    Žádné podkategorie <br>
  </div> -->
</template>

<script>
import { ref } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

import gql from "graphql-tag";
export default {
  name: "CategoryMenu",
  components: {
      Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  CheckIcon, 
  SelectorIcon
  },
  props: {
    parentcategory: {
      required: false,
      default: false,
      type: [String, Boolean]
    }
  },
  apollo: {
    categories: {
      query: gql`query
        example($filters: CategoryFilterInput){
          categories(
            filters: $filters
            pageSize:20,
            currentPage: 1
          ) {
            total_count
            items {
              id
              uid
              level
              name
              path
              children_count
              children {
                uid
                level
                name
                path
                children_count
                children {
                  uid
                  level
                  name
                  path
                }
              }
            }
            page_info {
              current_page
              page_size
              total_pages
            }
          }
        }
      `,
      variables(){
          if(this.parentcategory == false){
            return {
              filters: {}
            }
          }else{
            return {
              filters: {
                parent_id: {in: [this.parentcategory]}
              }
            }
          }
      }
    },
  },
}
</script>

<style lang="scss" scoped>

@import '../assets/_variables.scss';

.li-option{
  color:$bg-color;
  background-color:$light-font;
}

</style>