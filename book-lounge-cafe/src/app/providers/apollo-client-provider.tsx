import type { ReactNode } from "react"
import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "api/graphql/apollo-client"

type ApolloClientProviderProps = {
  children: ReactNode
}

export function ApolloClientProvider(props: ApolloClientProviderProps) {
  return <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
}
