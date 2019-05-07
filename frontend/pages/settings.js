import React, { Component } from 'react';
import App from '../components/App';
import SettingsContainer from '../containers/Settings';
import Me from '../components/queries/Me.query';

class SettingsPage extends Component {
  render() {
    return (
      <Me>
        {({ data: { Me: user } }) => (
          <App showNavigation title='Settings' user={user}>
            <SettingsContainer user={user} />
          </App>
        )}
      </Me>
    );
  }
}

export default SettingsPage;
