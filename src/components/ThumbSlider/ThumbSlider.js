/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './thumbSlider.module.scss';

class ThumbSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImgSrc: props.images[0]
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
            <li
              key={imgSrc}
              className={styles.thumbImageContainer}
              onClick={() => this.handleClickOnImage(imgSrc)}>
              <button type="button">
                <img className={styles.image} src={imgSrc} alt="Product" />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.mainImageContainer}>
          <img className={styles.image} src={activeImgSrc} alt="Product" />
        </div>
      </div>
    );
  }
}

ThumbSlider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  images: PropTypes.array.isRequired
};
// Product.propTypes = {
// size: PropTypes.oneOf(['big', 'small']).isRequired,
// eslint-disable-next-line react/forbid-prop-types
// product: PropTypes.object.isRequired
// product: PropTypes.objectOf(
//   PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     brand: PropTypes.string.isRequired,
//     // eslint-disable-next-line react/forbid-prop-types
//     prices: PropTypes.array.isRequired,
//     attributes: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//         items: PropTypes.arrayOf(
//           PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             displayValue: PropTypes.string.isRequired,
//             value: PropTypes.string.isRequired
//           })
//         ).isRequired
//       })
//     ).isRequired
//   })
// ).isRequired
// };

// ProductDescription.defaultProps = {
//   defAmount: 0
// };

export default ThumbSlider;
