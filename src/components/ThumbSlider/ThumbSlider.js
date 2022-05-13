import React from 'react';
import PropTypes from 'prop-types';

import styles from './thumbSlider.module.scss';

class ThumbSlider extends React.Component {
  constructor(props) {
    super(props);
    const { images } = this.props;
    this.state = {
      activeImgSrc: images[0]
    };
  }

  handleClickOnImage = (image) => {
    this.setState({
      activeImgSrc: image
    });
  };

  render() {
    const { activeImgSrc } = this.state;
    const { images } = this.props;
    return (
      <div className={styles.container}>
        <ul className={styles.thumbContainer}>
          {images.map((imgSrc) => (
            <li key={imgSrc} className={styles.thumbImageContainer}>
              <button
                type="button"
                className={styles.button}
                onClick={() => this.handleClickOnImage(imgSrc)}
              >
                <img className={styles.image} src={imgSrc} alt="Product" />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.mainImageContainer}>
          <img className={styles.mainImage} src={activeImgSrc} alt="Product" />
        </div>
      </div>
    );
  }
}

ThumbSlider.propTypes = {
  images: PropTypes.instanceOf(Array).isRequired
};

export default ThumbSlider;
