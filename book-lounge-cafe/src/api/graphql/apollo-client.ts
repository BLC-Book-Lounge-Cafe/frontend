import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { env } from "shared/lib/env"

const httpLink = new HttpLink({
  uri: env.graphqlUrl
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
