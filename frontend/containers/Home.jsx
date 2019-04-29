import React, { Fragment } from 'react';

const HomeContainer = ({ Me }) => (
  <Fragment>
    <h1>Apollo starter</h1>
    Me: {JSON.stringify(Me)}
  </Fragment>
);

export default HomeContainer;
