import { CURRENT_USER_QUERY } from '../../constants/queries';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

const Me = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

Me.propTypes = {
  children: PropTypes.func.isRequired
};

export default Me;
