<template>
  <div class="menu-item">
    <a href="#">
        {{title}}
    </a>
    <span class="material-icons">keyboard_double_arrow_down</span>
    <div class="sub-menu">
        <div v-for="(item, i) in items" :key="i" class="menu-item">
            <a :href="item.link">{{item.title}}</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'dropdown',
    props: ['title', 'items']
}
</script>

<style lang="scss" scoped>
    @import '../assets/_variables.scss';

    nav .menu-item span {
        width: 10px;
        margin-left: 10px;
        
        }
    nav .menu-item .sub-menu {
            position: absolute;
            background: $bg-color;
            top: calc(100% + 18px);
            transform: transleteX(-50%);
            width: max-content;
            border-radius: 0px 0px 16px 16px;
        }
    

</style>>
