import renderer from 'react-test-renderer';
import PreRegisterContainer from '../PreRegister';

describe('PreRegister container', () => {
  it('should match snapshot', () => {
    const handleChange = jest.fn();
    const invite = jest.fn();

    const tree = renderer
      .create(
        <PreRegisterContainer
          handleChange={handleChange}
          invite={invite}
          email=''
          loading={false}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
