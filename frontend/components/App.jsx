import Head from 'next/head';
import {
  bool, string, node, oneOfType, arrayOf
} from 'prop-types';
import Navigation from './Navigation';
import { MeProps } from './queries/Me.query';

const App = ({
  children, title, link, meta, showNavigation, me
}) => (
  <div className='fullHeight'>
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link
        href='https://fonts.googleapis.com/css?family=Roboto:300,400'
        rel='stylesheet'
      />
    </Head>

    {showNavigation ? <Navigation title={title} Me={me} /> : null}

    <main id='main'>{children}</main>
  </div>
);

App.propTypes = {
  showNavigation: bool,
  title: string.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
  link: string,
  meta: string,
  me: MeProps
};

App.defaultProps = {
  showNavigation: true
};

export default App;
