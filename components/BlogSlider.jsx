import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Fetch from 'react-fetch'
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
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

class SliderWrapper extends Component {
  constructor(props) {
      super(props);
      this.state = {
        lightbox: null
      };
  }

  render() {
    const self = this;
    const settings = {
      dots:           true,
      infinite:       true,
      speed:          500,
      slidesToShow:   1,
      slidesToScroll: 1,
      lazyLoad:       true
    };
    const {
      lightbox
    } = this.state;
    const images = this.props.files.map(function(file) {
      var uri = 'https://drive.google.com/uc?export=download&id=' +
                file.id;
      return (
        <div key={file.id} className={styles.wrapper}>
          <img src={uri}
               className={styles.image}
               onClick={() => self.setState({ lightbox: uri })}
          />
        </div>
      );
    });
    return (
      <div>
        { images.length > 0 &&
          <Slider {...settings} className={styles.container}>
            {images}
          </Slider>
        }
        { lightbox &&
          <Lightbox
              mainSrc={lightbox}
              onCloseRequest={() => this.setState({ lightbox: null })}
          />
        }
      </div>
    );
  }
}
SliderWrapper.defaultProps = {
  files: []
};

export default BlogSlider;
