import React, { Component } from 'react';

import { DeviceContext } from 'components/App/AppContext';
import Slide from 'components/Carousel/Slide';

import './Carousel.scss';

class Carousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      slideRef: null,
      slideWidth: 0,
      currentIndex: 0,
    }
  }

  // Get the context for the device type
  static contextType = DeviceContext;

  // We'll pass this to the slide component so it can set a slide ref for us
  // Note that as all slides are the same width, we'll only need one
  setSlideRef = ref => {
    this.setState({
      slideRef: ref,
    }, () => {
      // Set the slide width in state once we have a ref
      this.setSlideWidth();
    });
  }

  // Set the slide width in state
  setSlideWidth = () => {
    this.setState({ slideWidth: this.state.slideRef.current.offsetWidth });
  }

  componentDidMount() {
    // Reset the slide width on window resize
    window.addEventListener('resize', this.setSlideWidth);
  }

  render() {
    const { slides } = this.props;
    const { device } = this.context;
    const { slideWidth, currentIndex } = this.props;

    return (
      <div className={`carousel carousel--${device}`}>
        <div className="carousel__stage-wrapper">
          <ul
            className="carousel__stage"
            style={{
              transform: `translateX(-${slideWidth * currentIndex}px)`
            }}
          >
            {
              slides.map((slide, i) => (
                <Slide
                  data={slide}
                  key={slide.id}
                  order={i}
                  setSlideRef={this.setSlideRef}
                />
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Carousel;