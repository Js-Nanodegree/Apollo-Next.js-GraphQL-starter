import React from 'react';
import { MeProps } from '../components/queries/Me.query';

const SettingsContainer = ({ user }) => (
  <>
    <h1>Settings</h1>
    {JSON.stringify(user)}
  </>
);

SettingsContainer.propTypes = {
  user: MeProps
};

export default SettingsContainer;
