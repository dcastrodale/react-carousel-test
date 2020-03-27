import React, { Component } from 'react';
import axios from 'axios';

import { API_KEY, API_URL } from 'config';
import { isMobile } from 'helpers';

import { DeviceContext } from 'components/App/AppContext';
import Spinner from 'components/Spinner';
import Carousel from 'components/Carousel';

import './App.scss';

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    errored: false,
    imageListFetched: false,
    isMobile: true,
  }

  // Handle transition from mobile/desktop on resize
  handleResize() {
    // Don't unecessarily set the state
    if (isMobile() !== this.state.isMobile) {
      this.setState({
        isMobile: isMobile()
      });
    }
  }

  fetchImageList() {
    this.setState({
      loading: true,
    }, () => {
      // Fetch images in the setState callback here to avoid race conditions with the loading state
      const encodedQuery = encodeURIComponent(this.props.query);

      axios.get(`${API_URL}?key=${API_KEY}&q=${encodedQuery}&image_type=photo`)
        // Happy-path: set the list of images in state
        .then(({ data }) => {
          this.setState({
            images: data.hits.slice(0, this.props.numberOfImages),
            loading: false,
            errored: false,
            imageListFetched: true,
          });
        })
        // Set the errored state
        .catch(() => {
          this.setState({
            loading: false,
            errored: true,
          });
        });
    });
  }

  renderCarousel(images) {
    return images.length ?
      <Carousel slides={images} /> :
      (
        <div className="app__error-message">
          <p>No images found!</p>
        </div>
      )
  }

  componentDidMount() {
    // Set up the initial mobile/desktop data
    this.handleResize();
    window.addEventListener('resize', () => { this.handleResize() });

    // Fetch images list from the API
    this.fetchImageList();
  }

  render() {
    const { isMobile, loading, errored, imageListFetched, images } = this.state;

    return(
      <DeviceContext.Provider
        value={
          isMobile ?
            { device: 'mobile' } :
            { device: 'desktop', slidesPerScreen: 5 }
        }
      >
        <div className={`app app--${isMobile ? 'mobile' : 'desktop'}`}>
          <div className="app__header">
            <h1>Carousel Test</h1>
          </div>
          {
            // Show the loading spinner if we're fetching the image list
            loading &&
              <Spinner />
          }

          {
            // Show the carousel if all went well, or an error message if no images found
            !loading && imageListFetched &&
              this.renderCarousel(images)
          }

          {
            // Something went wrong
            !loading && errored &&
              <div className="app__error-message">
                <p>Something went wrong</p>
                <button onClick={() => {this.fetchImageList()}}>
                  Retry
                </button>
              </div>
          }
        </div>
      </DeviceContext.Provider>
    );
  }
};


