import React, { Component } from 'react'
import Head from 'next/head'
import Navigation from './Navigation'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { withRouter } from 'next/router'
import Loading from './Loading'
import withData from '../lib/withData'

const App = ({children, title, link, meta, showNavigation, Me}) => (

  <div style={{height: '100%'}}>

    <Head>
      <title>{title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href='https://fonts.googleapis.com/css?family=Roboto:300,400' rel='stylesheet' />
    </Head>

    {showNavigation ? <Navigation
      title={title}
      Me={Me}
    /> : null}

    <main id="main">{children}</main>

    <style jsx global>{`
      html{
        height: 100%;
        font-size: 16px;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
      }
      body {
        margin: 0;
        height: 100%;
      }
      main {
        height: 100%;
      }
      h1, h2, h3 {
        font-weight: 300;
      }
      #__next {
        height: 100%;
      }
    `}</style>
  </div>
)

export default App