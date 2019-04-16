import { PureComponent } from 'react';
import App from '../components/App';
import Me from '../components/queries/Me.query';
import InviteContainer from '../containers/Invite';

class InvitePage extends PureComponent {
  render() {
    return (
      <Me>
        {({ data: { Me: me } }) => (
          <App me={me} showNavigation title='Invite'>
            <InviteContainer />
          </App>
        )}
      </Me>
    );
  }
}

export default InvitePage;
