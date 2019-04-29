import { shape, string } from 'prop-types';

export const user = shape({
  __typename: string.isRequired,
  _id: string.isRequired,
  email: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired
});
