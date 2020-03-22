import React from 'react';
import PropTypes from 'prop-types';

import './Controls.scss';

const Controls = ({ advanceCarousel, atStart, atEnd }) => {
  return (
    <div className="controls">
      <div
        className={`controls__button controls__prev controls--${atStart ? 'inactive' : 'active'}`}
        role="button"
        onClick={() => advanceCarousel(-1)}
      />
      <div
        className={`controls__button controls__next controls--${atEnd ? 'inactive' : 'active'}`}
        role="button"
        onClick={() => advanceCarousel(1)}
      />
    </div>
  );
};

export default Controls;

Controls.propTypes = {
  advanceCarousel: PropTypes.func,
  atStart: PropTypes.bool,
  atEnd: PropTypes.bool,
};
