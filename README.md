# React Carousel Test

This is just a simple React carousel.

## Setup
- After cloning the repo, install all dependencies with `npm i`
- Start the dev server with `npm run start`
- Run tests with `npm run test`

## If I had time...
Given the time constraints for the exercise, this was not exactly an example of rigid TDD methodology. Tests are largely theoretical - basic functionality is tested, and I've documented what I would have liked to have done in comments, but even then, there aren't any tests for the Slide component. In particular, there's no actual testing around fetching data from the API. Ideally, we would create a stub for the API response and then mock the axios.get method. I've explained how I would handle this in comments.

Interactivity is minimal - the UX around the controls is pretty basic. For a real application, I'd be talking with the design/UX teams about the expected behaviour for hover states, what happens when the user hits the end of the carousel, etc. etc.

Resizes are handled very inelegantly - by resetting the currentIndex to 0. It would be nice to adjust the stage to the nearest current slide rather than resetting the whole thing.

For the purposes of this exercise, I've just pulled in the raw data from the API and basically passed that into the Carousel as-is. In a real application, I'd be looking to genericize the 'dumb' components (like Carousel and Slide) as much as possible, by having them accept very generic props that aren't related to the shape of the API response. In the past, I've used helper functions to parse API data, before passing that into my generic components.