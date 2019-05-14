import { shape, string, func } from 'prop-types';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../constants/queries';

export const MeProps = shape({
  __typename: string.isRequired,
  _id: string.isRequired,
  email: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired
});

const Me = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

Me.propTypes = {
  children: func.isRequired
};

export default Me;
