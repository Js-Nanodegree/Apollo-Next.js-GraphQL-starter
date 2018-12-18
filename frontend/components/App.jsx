import React, { Component } from 'react';

import Head from 'next/head';
import Loading from './Loading';
import Navigation from './Navigation';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import withData from '../lib/withData';
import { withRouter } from 'next/router';

const App = ({ children, title, link, meta, showNavigation, Me }) => (
  <div className="fullHeight">
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400"
        rel="stylesheet"
      />
    </Head>

    {showNavigation ? <Navigation title={title} Me={Me} /> : null}

    <main id="main">{children}</main>
  </div>
);

export default App;
