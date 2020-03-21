import React from 'react';

import './Controls.scss';

export default ({ advanceCarousel, atStart, atEnd }) => {
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
}