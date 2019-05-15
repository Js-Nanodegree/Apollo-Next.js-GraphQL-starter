import renderer from 'react-test-renderer';
import InviteContainer from '../Invite';

describe('Invite container', () => {
  it('should match snap shot', () => {
    const tree = renderer.create(<InviteContainer />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
