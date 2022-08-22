<template>
  <div class="menu-item" @click="ToggleDropdown">
    <a href="#" >
        {{title}}
    </a>
    <span class="material-icons">keyboard_double_arrow_down</span>
    <div :class="`sub-menu ${is_expanded && 'is-expanded'}`">
        <div v-for="(item, i) in items" :key="i" class="menu-item">
            <a :href="item.link">{{item.title}}</a>
        </div>
    </div>
  </div>
</template>

<script >
import { ref } from 'vue';

export default {
    name: 'Dropdown',
    props: ['title', 'items'],
    setup() {
        const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

        const ToggleDropdown = () => { 
            is_expanded.value = !is_expanded.value
            localStorage.setItem("is_expanded", is_expanded.value)
        }
        return {
            ToggleDropdown, is_expanded
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/_variables.scss';

    nav .menu-item span {
        width: 10px;
        margin-left: 10px;
        
        }
    nav .menu-item .sub-menu {
            display:none;
            position: absolute;
            background: $bg-color;
            top: calc(100% + 18px);
            transform: transleteX(-50%);
            width: max-content;
            border-radius: 0px 0px 8px 8px;
        &.is-expanded{
            display:inline-block;
        }
    }

</style>>
