import React from 'react';
import slider1 from '../image/slider1.jpg';
import slider2 from '../image/slider2.JPG';

const HomePageSlider = () => {
	return (
		<div
			id='carousel-homepage'
			className='carousel slide carousel-fade full-screen'
			data-ride='carousel'
		>
			{/* <!--Indicators--> */}
			<ol className='carousel-indicators'>
				<li
					data-target='#carousel-homepage'
					data-slide-to='0'
					className='active'
				></li>
				<li data-target='#carousel-homepage' data-slide-to='1'></li>
				<li data-target='#carousel-homepage' data-slide-to='2'></li>
			</ol>
			{/* <!--/.Indicators--> */}
			{/* <!--Slides--> */}
			<div className='carousel-inner' role='listbox'>
				<div className='carousel-item active'>
					<div className='view'>
						<img className='d-block w-100' src={slider1} alt='First slide' />
						{/* <div class='mask rgba-black-light'></div> */}
					</div>
				</div>
				<div className='carousel-item'>
					{/* <!--Mask color--> */}
					<div className='view'>
						<img className='d-block w-100' src={slider2} alt='Third slide' />
						{/* <div class='mask rgba-black-slight'></div> */}
					</div>
				</div>
			</div>
			{/* <!--/.Slides--> */}
			{/* <!--Controls--> */}
			<a
				className='carousel-control-prev'
				href='#carousel-homepage'
				role='button'
				data-slide='prev'
			>
				<span className='carousel-control-prev-icon' aria-hidden='true'></span>
				<span className='sr-only'>Previous</span>
			</a>
			<a
				className='carousel-control-next'
				href='#carousel-homepage'
				role='button'
				data-slide='next'
			>
				<span className='carousel-control-next-icon' aria-hidden='true'></span>
				<span className='sr-only'>Next</span>
			</a>
			{/* <!--/.Controls--> */}
		</div>
		// <!--/.Carousel Wrapper-->
	);
};

export default HomePageSlider;
