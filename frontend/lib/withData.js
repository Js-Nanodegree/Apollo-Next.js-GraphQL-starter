import withApollo from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';
import { GRAPHQL_ENDPOINT } from '../config/env';

function createClient({ headers }) {
  const cache = new InMemoryCache();

  const request = async (operation) => {
    operation.setContext({
      http: {
        includeExtensions: true,
        includeQuery: false,
      },
      headers
    });
  };

  const requestLink = new ApolloLink((operation, forward) => new Observable((observer) => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  }));

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log({ graphQLErrors });
        }
        if (networkError) {
          console.log('Logout user');
        }
      }),
      requestLink,
      withClientState({
        defaults: {
          isConnected: true
        },
        resolvers: {
          Mutation: {
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
              cache.writeData({ data: { isConnected } });
              return null;
            }
          }
        },
        cache
      }),
      createPersistedQueryLink().concat(new BatchHttpLink({
        uri: GRAPHQL_ENDPOINT,
        credentials: 'include'
      }))
    ]),
    cache
  });
}

export default withApollo(createClient);