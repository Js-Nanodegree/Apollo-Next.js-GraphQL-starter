import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from 'react-apollo';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../lib/getPageContext';
import withData from '../lib/withData';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  pageContext = getPageContext();

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />

              <Component pageContext={this.pageContext} {...pageProps} />
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
        <style jsx global>
          {`
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
            p {
              font-size: 1.6rem;
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
            .text-align__center {
              text-align: center;
            }
          `}
        </style>
      </Container>
    );
  }
}

export default withData(MyApp);
