import { ApolloLink, Observable, split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import withApollo from 'next-with-apollo';
import { withClientState } from 'apollo-link-state';
import { GRAPHQL_ENDPOINT, SERVER_PATH, WS_PATH } from '../config/env';

function createClient({ headers }) {
  const cache = new InMemoryCache();
  const ssrMode = !process.browser;
  const request = async (operation) => {
    operation.setContext({
      http: {
        includeExtensions: true,
        includeQuery: false
      },
      headers
    });
  };

  const requestLink = new ApolloLink(
    (operation, forward) => new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
  );

  const httpLink = new BatchHttpLink({
    uri: ssrMode ? SERVER_PATH : GRAPHQL_ENDPOINT,
    credentials: 'include'
  });

  // Make sure the wsLink is only created on the browser. The server doesn't have a native implemention for websockets
  const wsLink = process.browser
    ? new WebSocketLink({
      uri: WS_PATH,
      options: {
        reconnect: true
      }
    })
    : () => {
      // eslint-disable-next-line no-console
      console.log('Is server');
    };

  // Let Apollo figure out if the request is over ws or http
  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
        //  && process.browser
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          // eslint-disable-next-line no-console
          console.error({ graphQLErrors });
        }
        if (networkError) {
          // eslint-disable-next-line no-console
          console.error({ networkError });
        }
      }),
      requestLink,
      withClientState({
        defaults: {
          isConnected: true
        },
        resolvers: {
          Mutation: {
            // eslint-disable-next-line no-shadow
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
              cache.writeData({ data: { isConnected } });
              return null;
            }
          }
        },
        cache,
        ssrMode // Disables forceFetch on the server (so queries are only run once)
      }),

      // Push the links into the Apollo client
      createPersistedQueryLink().concat(terminatingLink)
    ]),
    cache
  });
}

export default withApollo(createClient);
