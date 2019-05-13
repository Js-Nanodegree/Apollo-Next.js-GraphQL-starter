import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

describe('App component', () => {
  it('should match snap shot', () => {
    const title = 'Test title';

    const component = renderer.create(
      <App title={title} showNavigation={false}>
        <div>
          <p>Test app children</p>
        </div>
      </App>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
