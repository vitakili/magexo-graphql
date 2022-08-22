import { createApp } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import App from './App.vue'
import router from './router'


const httpLink = createHttpLink({
  uri: 'https://venia.magento.com/graphql',
  // fetchOptions: {
  //   mode: 'no-cors',
  // }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true,
})

// Create a provider
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const v3app = createApp(App)

v3app.provide(DefaultApolloClient, apolloClient).use(router)
v3app.use(apolloProvider)
v3app.mount('#app')



