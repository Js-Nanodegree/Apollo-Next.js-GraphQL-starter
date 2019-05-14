import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import { CURRENT_USER_QUERY } from '../../../constants/queries';
import Me from '../Me.query';

const mocks = [
  {
    request: {
      query: CURRENT_USER_QUERY
    },
    result: {
      __typename: 'User',
      _id: '123456',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'Example'
    }
  }
];

describe('Me query component', () => {
  it('renders without error', () => {
    const component = renderer
      .create(
        <MockedProvider mocks={mocks}>
          <Me>{({ data }) => <p>{JSON.stringify(data)}</p>}</Me>
        </MockedProvider>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
