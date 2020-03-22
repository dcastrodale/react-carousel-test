import React from 'react';
import PropTypes from 'prop-types';

import './Controls.scss';

const Controls = ({ advanceCarousel, atStart, atEnd, device }) => {

  return (
    <div className={`controls controls--${device}`}>
      <div
        className={`controls__button controls__prev controls--${atStart ? 'inactive' : 'active'}`}
        role="button"
        onClick={() => advanceCarousel(-1)}
      >
        Prev
      </div>
      <div
        className={`controls__button controls__next controls--${atEnd ? 'inactive' : 'active'}`}
        role="button"
        onClick={() => advanceCarousel(1)}
      >
        Next
      </div>
    </div>
  );
};

export default Controls;

Controls.propTypes = {
  advanceCarousel: PropTypes.func,
  atStart: PropTypes.bool,
  atEnd: PropTypes.bool,
};
