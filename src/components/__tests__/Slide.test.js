import React from 'react';
import { shallow } from 'enzyme';

import Slide from 'components/Carousel/Slide';

const slideProps = {
  data: {
    webformatURL: 'http://example.com',
    user: 'Test User',
    tags: 'list, of, tags'
  }
}

it('should render a <li>', () => {
  const wrapped = shallow(<Slide {...slideProps} />);

  expect(wrapped.find('li').length).toEqual(1);

  wrapped.unmount();
})