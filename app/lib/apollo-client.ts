import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
    // local strapi cms
    link: new HttpLink({ uri: "http://localhost:1337/graphql" }),
    cache: new InMemoryCache(),
  });