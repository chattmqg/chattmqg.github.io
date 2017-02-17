import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Fetch from 'react-fetch'
import Slider from 'react-slick';
import styles from './slider.css';

/**
 * Google Drive API keys
 * see https://console.developers.google.com/apis/credentials
 */
const apiKeys = {
  localhost:  'AIzaSyA9ktbuz-q_yQESoQrX8nAjLq4Di5yPiFc',
  production: 'AIzaSyD-Wn8JbK9NVvjXUw44VcgOlqlTjyx4x5s'
};

/**
 * image slider/carousel for the MQG blog
 * . fetches a list of image names from a public Google Drive folder
 *   specified in the "post" query string parameter
 *      ex: ?post=0B3lnTTxoVKwSdk5qbXVjMmhWcVk
 * . uses the MQG's API key for Google Drive requests
 * . renders the results using the SliderWrapper component
 */
class GoogleSlider extends React.Component {
  // component properties
  static propTypes = {
    location: PropTypes.object.isRequired
  };
  // component rendering
  render() {
    const key  = apiKeys[window.location.hostname] || apiKeys.production;
    const post = this.props.location.query['post'];
    const uri  = 'https://www.googleapis.com/drive/v3/files'
                 + '?q=\'' + post + '\'+in+parents'
                 + '&key=' + key;

    return (
      <div className={styles.slider}>
        <Fetch url={uri}>
          <SliderWrapper/>
        </Fetch>
      </div>
    );
  }
}

/**
 * image slider fetch handler component
 * . receives the list of files from the Google Drive folder
 * . renders the slick carousel container
 * . renders each image inside the carousel
 */
class SliderWrapper extends React.Component {
  // component properties
  static defaultProps = {
    files: []
  };
  // component rendering
  render() {
    const settings = {
      dots:           true,   // display dot links below images
      infinite:       true,   // continue navigating past last image
      lazyLoad:       true,   // don't load all images at once
      slidesToShow:   1,      // display 1 image at a time
      slidesToScroll: 1,      // scroll 1 image at a time
      speed:          1000,   // animation speed during image transitions
      autoplay:       true,   // automatically navigate to the next image
      autoplaySpeed:  5000,   // time to wait before auto navigating
    };
    const images = this.props.files.map(this.renderImage);

    return (
      <div>
        {
          images.length > 0 &&
          <Slider {...settings}>
            {images}
          </Slider>
        }
        {
          this.props.error &&
          <pre className={styles.error}>
            {JSON.stringify(this.props.error, null, '  ')}
          </pre>
        }
      </div>
    );
  }
  /**
   * renders a single slider image
   * creates a public export link to the image in the drive,
   * which avoids API request usage/quotas for image retrieval
   * these requests go through a cloudfront distribution (at brentspell.com),
   * in order to avoid session timeouts at google, even though
   * the images have been given public access
   */
  renderImage(file) {
    const uri = 'https://d37mjccmyrzohp.cloudfront.net/uc?authuser=0&id=' + file.id;
    return (
      <div className={styles.wrapper}>
        <figure key={file.id} className={styles.figure}>
          <a href={uri} target="_blank">
            <img src={uri} className={styles.image}/>
          </a>
          <figcaption className={styles.caption}>{file.name.split('.')[0]}</figcaption>
        </figure>
      </div>
    );
  }
}

export default GoogleSlider;
