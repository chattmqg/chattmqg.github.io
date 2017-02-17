import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Fetch from 'react-fetch'
import Slider from 'react-slick';
import styles from './slider.css';

/**
 * image slider/carousel for the MQG blog
 * . fetches a list of image names from a public Facebook album
 *   specified in the "album" query string parameter
 *      ex: ?album=0B3lnTTxoVKwSdk5qbXVjMmhWcVk
 * . albums are proxied through a CloudFront distribution to hide API keys
 * . renders the results using the SliderWrapper component
 */
class FacebookSlider extends React.Component {
  // component properties
  static propTypes = {
    location: PropTypes.object.isRequired
  };
  // component rendering
  render() {
    const album = this.props.location.query['album'];
    const uri   = 'https://d184vr405alahm.cloudfront.net/v2.8/'
                  + album
                  + '/photos?fields=name,images,link';

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
 * . receives the list of files from the Facebook album
 * . renders the slick carousel container
 * . renders each image inside the carousel
 */
class SliderWrapper extends React.Component {
  // component properties
  static defaultProps = {
    data: []
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
    const images = this.props.data.map(this.renderImage);

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
    return (
      <div className={styles.wrapper}>
        <figure key={file.id} className={styles.figure}>
          <a href={file.link} target="_blank">
            <img src={file.images[0].source} className={styles.image}/>
          </a>
          <figcaption className={styles.caption}>{file.name}</figcaption>
        </figure>
      </div>
    );
  }
}

export default FacebookSlider;
