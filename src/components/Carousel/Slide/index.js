import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DeviceContext } from 'components/App/AppContext';
import './Slide.scss';

export default class Slide extends Component {
  constructor(props) {
    super(props);
    this.slideRef = React.createRef();
  }

  static contextType = DeviceContext;

  componentDidMount() {
    const { setSlideRef } = this.props;
    // If the parent passes in setSlideRef, we'll use it to set the ref.
    // Otherwise, ignore
    if (setSlideRef && typeof setSlideRef === 'function') {
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
          /* set the width for desktop */
          width: device === 'desktop' ? `${100 / this.context.slidesPerScreen}vw` : null
        }}
      >
        {
          /*
            Ideally, we'd want to use a title or description for the alt tag, but that's not available from the API
            So we'll use a list of tags instead
          */
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


Slide.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    user: PropTypes.string,
    tags: PropTypes.string,
    id: PropTypes.number,
  })
};
