import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Tabs } from 'antd';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../style/singleproduct.carousel.css';
import { Carousel } from 'react-responsive-carousel';
import ankIcon from '../../image/ank.svg';
import AddToCart from '../../components/button/AddToCart';
import ProductInfoList from './ProductInfoList';
import Rating from '../../components/Rating';
import ProductRating from '../../components/ProductRating';
import ProductRatingModal from '../../components/modal/ProductRatingModal';
import AddToWishlist from '../../components/button/AddToWishlist';

const { TabPane } = Tabs;

function SingleProduct({ product, star, setStar, loadSingleProduct }) {
	const { title, images, description, ratings, _id } = product;
	const { user } = useSelector((state) => state);

	const showCarousel = (images) => {
		if (images && images.length) {
			return (
				<Carousel autoPlay infiniteLoop className='single-product-carousel'>
					{images.map((image) => (
						<img src={image.url} key={image.public_id} alt={image.public_id} />
					))}
				</Carousel>
			);
		}
		return (
			<Carousel className='single-product-carousel'>
				<img src={ankIcon} alt='Single Product' />
			</Carousel>
		);
	};

	return (
		<>
			<div className='col-md-7'>
				<h1 className='border-bottom py-1 px-3'>{title}</h1>
				<div className='row p-3'>
					<div className='col-md-6'>
						<span className='h3 text-center'>
							<span className='label label-default label-pill pull-xs-right'>
								${product&&product.price} <span className='h6'>inc GST</span>
							</span>
						</span>
					</div>
					<div className='col-md-6'>
						<ProductRating ratings={ratings} isShowNum={true} />
					</div>
				</div>
				<Card
					className='mx-auto'
					actions={[
						<AddToCart product={product} />,
						<AddToWishlist user={user} id={_id} />,
						<ProductRatingModal
							user={user}
							star={star}
							setStar={setStar}
							loadSingleProduct={loadSingleProduct}
						>
							<Rating
								star={star}
								setStar={setStar}
								disabled={false}
								isShowNum={true}
							/>
						</ProductRatingModal>,
					]}
				>
					<ProductInfoList product={product} />
				</Card>
			</div>
			<div className='col-md-5'>
				{showCarousel(images)}
				<Tabs type='card'>
					<TabPane tab='Description' key={1}>
						{description}
					</TabPane>
					<TabPane tab='More information' key={2}></TabPane>
				</Tabs>
			</div>
		</>
	);
}

export default SingleProduct;
