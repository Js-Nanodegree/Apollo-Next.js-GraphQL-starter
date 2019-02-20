import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query {
    Me {
      _id
      email
      firstName
      lastName
    }
  }
`;
