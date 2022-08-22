<template>
  <v-container>
    <v-row>
      <v-col
          lg="3"
          md="5"
          sm="12">
        <h2 class="mb-3">Podkategorie</h2>
        <CategoryMenu :parentcategory="String(categoryid)"></CategoryMenu>
      </v-col>
      <v-col
          lg="9"
          md="7"
          sm="12"
          v-if="category !== null && products">
        <div>
          <v-breadcrumbs
              :items="breadcrumbs"
              large
          ></v-breadcrumbs>
        </div>
        <v-row
            v-if="products.items.length > 0"
        >
          <v-col
              v-for="product in products.items" :key="product.sku"
              lg="4"
              md="6"
              sm="12"
          >
            <v-card
                class="pa-2"
                outlined
                tile
            >
              <img :src="product.image.url" height="450" class="img-responsive"/>
              <h2>{{product.name}}</h2>
              <h3>{{product.price_range.minimum_price.regular_price.value}} {{product.price_range.minimum_price.regular_price.currency}}</h3>
            </v-card>
          </v-col>
        </v-row>
        <div v-else>žádné produkty</div>
      </v-col>
    </v-row>

    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-pagination
                v-model="page"
                :length="numberOfTotalPages"
                @input="changePaging($event)"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<script>
import gql from "graphql-tag";
import CategoryMenu from "@/components/CategoryMenu.vue";

export default {
  name: "ProductList",
  components: {
    CategoryMenu
  },
  data: function (){
    return {
      categoryid: null,
      page: 1,
      pagesize: 9
    }
  },
  watch: {
    $route(to) {
      this.categoryid = to.params.id;
      this.page = parseInt(to.params.page);
    }
  },
  mounted() {
    this.categoryid = this.$route.params.id;
    this.page = parseInt(this.$route.params.page);
  },
  methods: {
    changePaging: function (page) {
      this.$router.push({ params: { page: page } });
      window.scrollTo(0, 0, { behavior: 'smooth'});
    }
  },
  computed: {
    numberOfTotalPages: function (){
      if(this.products){
        return Math.ceil(this.products.total_count / this.pagesize);
      }
      return 0;
    },
    breadcrumbs: function () {
      let items = [{text: 'Domů', href: '/'}];
      let br = this.category.breadcrumbs;
      for(let i in br){
        let breadcrumb = br[i];
        items.push({text:breadcrumb.category_name, href: '/category/' + breadcrumb.category_id + '/1'});
      }
      items.push({text: this.category.name});
      return items;
    }
  },
  apollo: {
    category: {
      query: gql `query example($id: Int){
        category(id: $id) {
          id
          level
          name
          breadcrumbs {
            category_id
            category_name
            category_level
            category_url_key
            category_url_path
          }
        }
      }`,
      variables() {
        return {
          id: this.categoryid
        }
      }
    },
    products: {
      query: gql`query
        example($category: String, $page: Int, $pagesize: Int){
          products(
              filter: { category_id: {eq: $category} },
              pageSize: $pagesize,
              currentPage: $page
          ) {
            items {
              name
              sku,
              image{
                  url
              },
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                }
              }
            },
            total_count
          }
        }
      `,
      variables() {
        return {
          category: this.categoryid,
          page: this.page,
          pagesize: this.pagesize
        }
      }
    }
  }
}
</script>

<style scoped>
  html {
    scroll-behavior: smooth;
  }
</style>