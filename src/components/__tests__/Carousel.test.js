import React from 'react';
import { mount } from 'enzyme';

import Carousel from 'components/Carousel';

// TODO: break this off into a stub
const carouselProps = {
  slides: [
    {
      "id": 3077928,
      "pageURL": "https://pixabay.com/photos/fantasy-beautiful-dawn-sunset-sky-3077928/",
      "type": "photo",
      "tags": "fantasy, beautiful, dawn",
      "previewURL": "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_150.jpg",
      "previewWidth": 150,
      "previewHeight": 84,
      "webformatURL": "https://pixabay.com/get/55e0d2444350a414f6da8c7dda793e781039dee3564c704c7d2b73d5944bc759_640.jpg",
      "webformatWidth": 640,
      "webformatHeight": 360,
      "largeImageURL": "https://pixabay.com/get/55e0d2444350a414f6da8c7dda793e781039dee3564c704c7d2b73d5944bc759_1280.jpg",
      "imageWidth": 3840,
      "imageHeight": 2160,
      "imageSize": 1925809,
      "views": 1453143,
      "downloads": 709287,
      "favorites": 1965,
      "likes": 2257,
      "comments": 229,
      "user_id": 2946451,
      "user": "peter_pyw",
      "userImageURL": "https://cdn.pixabay.com/user/2018/01/12/08-06-25-409_250x250.jpg"
    },
    {
      "id": 1072828,
      "pageURL": "https://pixabay.com/photos/green-park-season-nature-outdoor-1072828/",
      "type": "photo",
      "tags": "green, park, season",
      "previewURL": "https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828_150.jpg",
      "previewWidth": 150,
      "previewHeight": 84,
      "webformatURL": "https://pixabay.com/get/57e0d2414250a414f6da8c7dda793e781039dee3564c704c7d2b73d5944bc759_640.jpg",
      "webformatWidth": 640,
      "webformatHeight": 360,
      "largeImageURL": "https://pixabay.com/get/57e0d2414250a414f6da8c7dda793e781039dee3564c704c7d2b73d5944bc759_1280.jpg",
      "imageWidth": 3456,
      "imageHeight": 1944,
      "imageSize": 4796428,
      "views": 693113,
      "downloads": 332069,
      "favorites": 1701,
      "likes": 1787,
      "comments": 221,
      "user_id": 1720744,
      "user": "Valiphotos",
      "userImageURL": "https://cdn.pixabay.com/user/2019/03/07/09-34-13-97_250x250.jpg"
    }
  ]
}

let wrapped;

beforeEach(() => {
  wrapped = mount(<Carousel {...carouselProps} />)
});

it('should render a carousel div', () => {
  expect(wrapped.find('.carousel').length).toEqual(1);
});

it('should render n number of Slides for n slides in props', () => {
  // TODO: import the stub and then use slice to pull off n number of slides
  expect(wrapped.find('Slide').length).toEqual(2);
});

it('should update currentIndex when advanceCarousel is called', () => {
  const instance = wrapped.instance();
  expect(wrapped.state('currentIndex')).toBe(0);

  instance.advanceCarousel(1);
  wrapped.update();
  expect(wrapped.state('currentIndex')).toBe(1);

  instance.advanceCarousel(-1);
  wrapped.update();
  expect(wrapped.state('currentIndex')).toBe(0);
});

afterEach(() => {
  wrapped.unmount();
});