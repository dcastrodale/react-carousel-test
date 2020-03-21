import React, { Component } from 'react';

import { DeviceContext } from 'components/App/AppContext';
import './Slide.scss';

export default class Slide extends Component {
  constructor(props) {
    super(props);
    this.slideRef = React.createRef();
  }

  static contextType = DeviceContext;

  componentDidMount() {
    const { order, setSlideRef } = this.props;
    // If this is the first slide, we will use it to set a ref in the Carousel component
    if (order === 0) {
      setSlideRef(this.slideRef);
    }
  }

  render() {
    const { webformatURL, user, tags } = this.props.data;
    const { device } = this.context;

    return (
      <li
        className={`slide slide--${device}`}
        ref={this.slideRef}
        style={{
          // set the width for desktop
          width: device === 'desktop' ? `${100 / this.context.slidesPerScreen}vw` : null
        }}
      >
        {
          // Ideally, we'd want to use a title or description for the alt tag, but that's not available from the API
          // So we'll use a list of tags instead
        }
        <img
          className="slide__img"
          src={webformatURL}
          alt={tags}
        />
        <p className="slide__title">
          {`Image by ${user}`}
        </p>
      </li>
    );
  }
}
