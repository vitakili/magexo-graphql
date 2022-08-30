<template>
  <div class="top-16">



    <Menu as="div" class="relative inline-block text-left">
      
      <div class="px-1 py-1">
        <select 
        v-model="selectedOption"
        class="inline-flex w-full justify-center rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
        <ChevronDownIcon class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
        
          <option 
            v-for="(option, key) in options"
            :key="key" 
            :value="option"
            @click="onSelected"
            >
            {{option}}
          </option>
         </select>

      </div>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

export default {
  name: 'SelectMenu',
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon,
  },
  props: {
    value: null,
    options: {
      required: true,
      type: [Array],
    }
  },
  data () {
    return {
      selectedOption: 6,
    }
  },
  methods: {
    onSelected: function() {
      this.$emit('select-option', this.selectedOption)
    }
  },
  mounted () {
    this.selectedOption = this.value
  },
  watch: {
    value: function (newValue) {
      this.selectedOption = newValue
    }
  }
}
</script>

<style></style>
