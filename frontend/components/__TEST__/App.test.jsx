import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { CURRENT_USER_QUERY } from '../../constants/queries';
import App from '../App';

/*
 * Next router can only be used on the client so it needs to be mocked
 */
jest.mock('next/router');

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

describe('App component', () => {
  it('should match snap shot', () => {
    const title = 'Test title';

    const withNavigation = renderer
      .create(
        <MockedProvider mocks={mocks}>
          <App title={title} showNavigation>
            <div>
              <p>Test app children</p>
            </div>
          </App>
        </MockedProvider>
      )
      .toJSON();

    expect(withNavigation).toMatchSnapshot();

    const noNavigation = renderer
      .create(
        <App title={title} showNavigation={false}>
          <div>
            <p>Test app children</p>
          </div>
        </App>
      )
      .toJSON();

    expect(noNavigation).toMatchSnapshot();
  });

  it('should render the page title', () => {
    const title = 'Test title';

    const wrapper = shallow(
      <App title={title} showNavigation={false}>
        <div>
          <p>Test app children</p>
        </div>
      </App>
    );

    expect(wrapper.find('title').text()).toBe(title);
  });
});
