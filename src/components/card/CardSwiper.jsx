import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import '../../style/product.cardswiper.css'
import ProductCard from './ProductCard';

// install Swiper modules
SwiperCore.use([Pagination,Navigation, Autoplay]);
function CardSwiper({products}) {
	return (
		<Swiper breakpoints={{
			640: {
			  width: 580,
			  slidesPerView: 1,
			},
			768: {
			  width: 668,
			  slidesPerView: 2,
			},
			992: {
				width: 902,
				slidesPerView: 3,
			},
			1200: {
				width: 1100,
				slidesPerView: 4,
			},
			1400: {
				width: 1380,
				slidesPerView: 5,
			}

		}}
			autoplay={{
				delay: 5000,
			}}
			spaceBetween={10}
			slidesPerGroup={5}
			loop={true}
			loopFillGroupWithBlank={true}
			navigation={true}
			className='mySwiper'>
			{products && products.length > 0 ? products.map((product, index) => (
				<SwiperSlide key={product._id} virtualIndex={index}>
					<ProductCard product={product} />
				</SwiperSlide>
				))
			: ''}
		</Swiper>
	)
}

export default CardSwiper
