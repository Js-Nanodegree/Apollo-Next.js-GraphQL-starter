import React from 'react';
import { MeProps } from '../components/queries/Me.query';

const HomeContainer = ({ Me }) => (
  <>
    <h1>Apollo starter</h1>
    Me: {JSON.stringify(Me)}
  </>
);

HomeContainer.propTypes = {
  Me: MeProps
};

export default HomeContainer;
