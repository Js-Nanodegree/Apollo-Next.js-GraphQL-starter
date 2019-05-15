import renderer from 'react-test-renderer';
import RegisterContainer from '../Register';

describe('PreRegister container', () => {
  it('should match snapshot', () => {
    const handleChange = jest.fn();
    const register = jest.fn();

    const tree = renderer
      .create(
        <RegisterContainer
          handleChange={handleChange}
          register={register}
          firstName=''
          lastName=''
          password=''
          passwordRepeat=''
          called={false}
          loading={false}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
