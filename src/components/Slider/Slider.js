/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import './slider.scss';

class Slider extends React.Component {
  render() {
    const { images } = this.props;
    return (
      <div className="slider-container">
        <Swiper navigation modules={[Navigation]}>
          {images.map((img) => (
            <SwiperSlide key={img}>
              <img className="slider-container__image" src={img} alt="Product" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}

Slider.propTypes = {
  images: PropTypes.instanceOf(Array).isRequired
};

export default Slider;
