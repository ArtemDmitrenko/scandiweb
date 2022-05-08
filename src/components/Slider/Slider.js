/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
        <Swiper
          navigation
          modules={[Navigation]}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}>
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
  // eslint-disable-next-line react/forbid-prop-types
  images: PropTypes.array.isRequired
};

export default Slider;
