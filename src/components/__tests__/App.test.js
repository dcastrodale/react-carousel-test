import React from 'react';
import { shallow } from 'enzyme';
import waitUntil from 'async-wait-until';

import App from 'components/App';
import Carousel from 'components/Carousel';
import Spinner from 'components/Spinner';

const appProps = {
  numberOfImages: 2,
  query: 'beautiful landscape'
}

const wrapped = shallow(<App {...appProps} />);

it ('should render a loading spinner when fetching data', async done => {
  await waitUntil(() => wrapped.state('loading') === true);
  expect(wrapped.find(Spinner).length).toEqual(1);

  done();
});

//TODO: Create a mock for the Axios request call and test that it is being called.
  // We would do this by mocking axios and then spying on the componentDidMount method

// TODO: Test that the correct props are being passed into the Carousel component after the above API call

it ('should render a Carousel component after fetching data', async done => {
  await waitUntil(() => wrapped.state('images').length > 0);
  expect(wrapped.find(Carousel).length).toEqual(1);

  done();
});


// TODO: Test the error states by passing a rejected promise into the mocked Axios call (see above)

afterAll(() => {
  wrapped.unmount();
})