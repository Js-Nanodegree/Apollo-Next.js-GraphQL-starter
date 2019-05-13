import React from 'react';
import Container from '../components/Container';
import { MeProps } from '../components/queries/Me.query';

const HomeContainer = ({ Me }) => (
  <Container>
    <h1>Apollo starter</h1>
    Me: {JSON.stringify(Me)}
  </Container>
);

HomeContainer.propTypes = {
  Me: MeProps
};

export default HomeContainer;
