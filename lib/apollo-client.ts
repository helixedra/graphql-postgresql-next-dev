import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";

// Create a singleton instance to be used throughout the app
let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = (isServer: boolean = false) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
    : "http://localhost:3000/api/graphql";

  return new ApolloClient({
    link: new HttpLink({
      uri: apiUrl,
      fetch,
    }),
    cache: new InMemoryCache(),
    ssrMode: isServer, // Server Components
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network", // Use cache first for better performance
      },
      query: {
        fetchPolicy: "cache-first", // Use cache first for better performance
      },
    },
  });
};

// Returns a singleton instance for client components
export function getApolloClient() {
  // Create the client once in the client
  if (!apolloClient) {
    apolloClient = createApolloClient(false);
  }

  return apolloClient;
}

// Hook for Client Components (backward compatibility)
export function useApolloClient() {
  return getApolloClient();
}

// Instance for Server Components
const serverApolloClient = createApolloClient(true);
export { serverApolloClient };
