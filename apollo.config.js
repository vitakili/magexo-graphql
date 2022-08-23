module.exports = {
  client: {
    service: {
      name: 'graphql',
      // URL to the GraphQL API
      url: env.VUE_APPOLLO_GRAPHQL_HTTP,
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}