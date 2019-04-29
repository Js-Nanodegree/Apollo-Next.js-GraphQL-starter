import React, { Fragment } from 'react';
import { user } from '../constants/props';

const HomeContainer = ({ Me }) => (
  <Fragment>
    <h1>Apollo starter</h1>
    Me: {JSON.stringify(Me)}
  </Fragment>
);

HomeContainer.propTypes = {
  Me: user
};

export default HomeContainer;
