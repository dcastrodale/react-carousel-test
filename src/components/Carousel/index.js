import React, { Component } from 'react';

import { DeviceContext } from 'components/App/AppContext';
import Slide from 'components/Carousel/Slide';
import Controls from 'components/Carousel/Controls';

import './Carousel.scss';

class Carousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      slideRef: null,
      slideWidth: 0,
      currentIndex: 0,
      slides: [],
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

  // Advances the carousel (or moves it backwards)
  advanceCarousel = direction => {
    const { currentIndex } = this.state;
    // Don't let the user advance beyond the start or end of the carousel
    // TODO: add a bounce animation or something here
    if (
      currentIndex + direction >= this.props.slides.length ||
      currentIndex + direction < 0
    ) {
      return null;
    }

    this.setState({
      currentIndex: this.state.currentIndex + direction
    });
  }

  // Resets the carousel to the start
  // TODO: come up with a more elegant solution for this
  resetCarousel = () => {
    this.setState({
      currentIndex: 0
    })
  }

  componentDidMount() {
    // Reset the slide width on window resize
    window.addEventListener('resize', () => {
      this.setSlideWidth();
      this.resetCarousel();
    });
  }

  render() {
    const { slides } = this.props;
    const { device } = this.context;
    const { slideWidth, currentIndex } = this.state;

    return (
      <div className={`carousel carousel--${device}`}>
        <div className="carousel__stage-wrapper">
          <ul
            className="carousel__stage"
            style={{
              transform: `translateX(-${slideWidth * currentIndex}px)`,
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
        <Controls
          advanceCarousel={this.advanceCarousel}
          atStart={this.state.currentIndex === 0}
          atEnd={this.state.currentIndex >= this.props.slides.length - 1}
        />
      </div>
    );
  }
}

export default Carousel;