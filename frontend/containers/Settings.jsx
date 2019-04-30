import React from 'react';
import { MeProps } from '../components/queries/Me.query';

const SettingsContainer = ({ Me }) => (
  <>
    <h1>Settings</h1>
    Me: {JSON.stringify(Me)}
  </>
);

SettingsContainer.propTypes = {
  Me: MeProps
};

export default SettingsContainer;
