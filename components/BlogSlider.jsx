import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function BlogSlider({ location }) {
  const post = location.query['post'];

  return (
    <div>
      <div>
        <div>blog post: {post}</div>
      </div>
    </div>
  );
}

BlogSlider.propTypes = propTypes;

export default BlogSlider;
