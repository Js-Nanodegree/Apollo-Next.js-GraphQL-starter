import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import LoginContainer from '../Login';

describe('Login container', () => {
  it('should match snap shot', () => {
    const handleLogin = jest.fn();
    const handleChange = jest.fn();

    const tree = renderer
      .create(
        <LoginContainer
          handleLogin={handleLogin}
          loading={false}
          email=''
          password=''
          handleChange={handleChange}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should disable the submit button if !email || !password', () => {
    const handleLogin = jest.fn();
    const handleChange = jest.fn();
    const render = shallow(
      <LoginContainer
        handleLogin={handleLogin}
        loading={false}
        email=''
        password=''
        handleChange={handleChange}
      />
    );

    const submitButton = render.find('[type="submit"]');

    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('Should enable the submit button if email && password', () => {
    const handleLogin = jest.fn();
    const handleChange = jest.fn();
    const render = shallow(
      <LoginContainer
        handleLogin={handleLogin}
        loading={false}
        email='test@example.com'
        password='passeord'
        handleChange={handleChange}
      />
    );

    const submitButton = render.find('[type="submit"]');

    expect(submitButton.prop('disabled')).toBe(false);
  });

  it('Should call the handle login function', () => {
    const handleLogin = jest.fn(() => true);
    const handleChange = jest.fn();
    const render = shallow(
      <LoginContainer
        handleLogin={handleLogin}
        loading={false}
        email='test@example.com'
        password='passeord'
        handleChange={handleChange}
      />
    );

    const submitButton = render.find('[type="submit"]');

    submitButton.simulate('click');

    expect(handleLogin).toBeCalled();
  });
});
