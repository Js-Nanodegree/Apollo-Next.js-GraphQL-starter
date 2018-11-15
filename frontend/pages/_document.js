import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import flush from 'styled-jsx/server';
import PropTypes from 'prop-types';
import React from 'react';
import Manifest from 'next-manifest/manifest';

class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        // Material-UI SSR setup
        let pageContext;
        const page = renderPage((Component) => {
            const WrappedComponent = (props) => {
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
        const appPage = renderPage(App => props => sheet.collectStyles(<App {...props} />));
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
                </body>
            </html>
        );
    }
}

export default MyDocument;