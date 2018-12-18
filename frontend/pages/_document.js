import Document, { Head, Main, NextScript } from 'next/document';

import Manifest from 'next-manifest/manifest';
import PropTypes from 'prop-types';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Material-UI SSR setup
    let pageContext;
    const page = renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext; // eslint-disable-line
        return <Component {...props} />;
      };

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired
      };

      return WrappedComponent;
    });

    // Styled components SSR setup
    const sheet = new ServerStyleSheet();
    const appPage = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return {
      ...page,
      ...appPage,
      styleTags,
      pageContext,
      styles: (
        <>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString()
            }}
          />
          {flush() || null}
        </>
      )
    };
  }

  render() {
    const { pageContext, styleTags } = this.props;
    return (
      <html lang="en">
        <Head>
          {styleTags}
          <Manifest href="/static/manifest.json" />
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />

          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary.main}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`
            html {
              height: 100%;
              font-size: 10px;
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
            h1,
            h2,
            h3 {
              font-weight: 300;
            }
            #__next {
              height: 100%;
            }
            .fullHeight {
              height: 100%;
            }
            .fullWidth {
              width: 100%;
            }
            .display__flex {
              display: flex;
            }
            .align-items__center {
              align-items: center;
            }
            .align-content__center {
              align-content: center;
            }
            .margin__zero-auto {
              margin: 0 auto;
            }
            .form-wrapper {
              width: 100%;
              max-width: 450px;
              margin: 0 auto;
            }
            .form__inner {
              padding: 1rem;
            }
          `}</style>
        </body>
      </html>
    );
  }
}

export default MyDocument;
