import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import HomeContainer from '../Home';

describe('Home container', () => {
  it('should match snap shot', () => {
    const tree = renderer.create(<HomeContainer />).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should render child text', () => {
    const wrapper = shallow(<HomeContainer />);

    expect(wrapper.find('h1')).toBeTruthy();
  });
});
