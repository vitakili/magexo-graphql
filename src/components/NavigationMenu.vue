<template>
  <header>
    <nav>
      <div class="d-flex align-center">
        <router-link to="/">
          <div class="logo">
              <img src="../assets/logo.svg" alt="logo">
          </div>

        </router-link>
      </div>
    <div class="menu-item"><a href=""></a>Home</div>
    <div class="menu-item"><a href=""></a>About</div>
    <Dropdown title="Services" :items="services" :is_expanded="false"/>
    <div class="menu-item"><a href=""></a>Contact</div>
    </nav>
    </header>
</template>

<script>
import Dropdown from './Dropdown.vue';

export default {
  name: 'NavigationMenu',
  components: {
    Dropdown
  },
  data () {
    return {
      services: [
        {
          title: 'Web',
          link: '#'
        },
                {
          title: 'Design',
          link: '#'
        },
                {
          title: 'Trying',
          link: '#'
        },
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../assets/_variables.scss';

  header{
    width: 100vw;
    background-color: $bg-color;
    text-transform:uppercase;
    color: $light-font;
    border-image: $border_image 100% 0 stretch;
    border-bottom: 2px solid;
    padding: 15px;
        .logo {
            margin-bottom: 1rem;
            img {
                width: 2rem;
            }
        }
    }
    nav{
      display: flex;
      align-items: center;
      justify-content: center;
        .menu-item{
        color:$light-font;
        padding: 10px 20px;
        position:relative;
        text-align:center;
        border-bottom: 3px solid transparent;
        display: flex;
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

</style>>
