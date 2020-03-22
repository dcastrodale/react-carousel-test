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
    // The API uses +s instead of standard URI encoding to handle spaces so we have to do it ourselves.
    // TODO: Handle encoding special characters here
    const encodedQuery = this.props.query.replace(/\s/g, '+');

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
  }

  componentDidMount() {
    // Set up the initial mobile/desktop data
    this.handleResize();
    window.addEventListener('resize', () => { this.handleResize() });

    // Fetch images list from the API, and set mobile/desktop mode
    this.setState({
      loading: true,
    }, () => {
      // Fetch images in the setState callback to avoid race conditions with the loading state
      this.fetchImageList();
    });
  }

  // TODO: This is quite an ugly render method, with a lot of logic contained it it
  // Refactor, possibly extrapolate some of the logic out into generateMarkup functions
  render() {
    return(
      <DeviceContext.Provider
        value={
          this.state.isMobile ?
            { device: 'mobile' } :
            { device: 'desktop', slidesPerScreen: 5 }
        }
      >
        <div className={`app app--${this.state.isMobile ? 'mobile' : 'desktop'}`}>
          <div className="app__header">
            <h1>Carousel Test</h1>
          </div>
          {
            // Show the loading spinner if we're fetching the image list
            this.state.loading &&
              <Spinner />
          }

          {
            // Show the carousel if all went well
            !this.state.loading &&
              this.state.imageListFetched &&
              this.state.images.length &&
                <Carousel slides={this.state.images} />
          }

          {
            // No images found!
            !this.state.loading &&
              this.state.imageListFetched &&
              !this.state.images.length &&
                <div className="app__error-message">
                  <p>No images found!</p>
                </div>
          }

          {
            // Something went wrong
            !this.state.loading && this.state.errored &&
              <div className="app__error-message">
                <p>Something went wrong</p>
              </div>
          }
        </div>
      </DeviceContext.Provider>
    );
  }
}

