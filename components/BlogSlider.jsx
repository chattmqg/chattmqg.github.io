import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Fetch from 'react-fetch'
import Slider from 'react-slick';
import styles from './slider.css';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function BlogSlider({ location }) {
  const post = location.query['post'];

  function getFetchUri (post) {
    return "https://www.googleapis.com/drive/v3/files?q='" +
           post +
           "'+in+parents&key=AIzaSyD-Wn8JbK9NVvjXUw44VcgOlqlTjyx4x5s";
  }

  return (
    <div>
      <Fetch url={getFetchUri(post)}>
        <SliderWrapper/>
      </Fetch>
    </div>
  );
}

BlogSlider.propTypes = propTypes;

class SliderWrapper extends React.Component {
  render() {
    const settings = {
      dots:           true,
      infinite:       true,
      speed:          500,
      slidesToShow:   1,
      slidesToScroll: 1,
      lazyLoad:       true
    };
    const images = this.props.files.map(function(file) {
      var uri = 'https://drive.google.com/uc?export=download&id=' +
                file.id;
      return (
        <div key={file.id} className={styles.wrapper}>
          <img src={uri} className={styles.image}/>
        </div>
      );
    });
    if (images.length === 0)
      return <div/>
    else
      return (
        <div>
          <Slider {...settings}>
            {images}
          </Slider>
        </div>
      );
  }
}
SliderWrapper.defaultProps = {
  files: []
};

export default BlogSlider;
