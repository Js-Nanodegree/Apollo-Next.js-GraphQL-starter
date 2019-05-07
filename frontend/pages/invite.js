import { PureComponent } from 'react';
import App from '../components/App';
import Me from '../components/queries/Me.query';
import InviteContainer from '../containers/Invite';

class InvitePage extends PureComponent {
  render() {
    return (
      <Me>
        {({ data: { Me: user } }) => (
          <App user={user} showNavigation title='Invite'>
            <InviteContainer />
          </App>
        )}
      </Me>
    );
  }
}

export default InvitePage;
