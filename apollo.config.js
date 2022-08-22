module.exports = {
  client: {
    service: {
      name: 'graphql',
      // URL to the GraphQL API
      url: "https://venia.magento.com/graphql",
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}