import React from 'react';
import { shallow } from 'enzyme';
import waitUntil from 'async-wait-until';

import App from 'components/App';
import Carousel from 'components/Carousel';
import Spinner from 'components/Spinner';

const wrapped = shallow(<App />);

it ('should render a loading spinner when fetching data', async done => {
  await waitUntil(() => wrapped.state('loading') === true);
  expect(wrapped.find(Spinner).length).toEqual(1);

  done();
});

it ('should render a Carousel component after fetching data', async done => {
  await waitUntil(() => wrapped.state('images').length > 0);
  expect(wrapped.find(Carousel).length).toEqual(1);

  done();
});

afterAll(() => {
  wrapped.unmount();
})