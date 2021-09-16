import React from 'react';
import { useSelector } from 'react-redux';
import AddToCart from '../button/BtnAddToCart';
import AddToWishlist from '../button/BtnAddToWishlist';
import { Link, useHistory } from 'react-router-dom';
import ankIcon from '../../image/ank.svg';
import ProductRating from '../ProductRating';
import '../../style/product.card.css';

function ProductCard({ product, cardStyle }) {
	const { title, description, images, slug, ratings, price, _id } = product;
	const { user } = useSelector((state) => state);
	let history = useHistory();
	const handleClick = async (e) => {
		e.preventDefault();
		history.push(`/product/${slug}`);
	};

	return (
		<div className='card product-card' id='product-card' style={cardStyle}>
			<div
				className='product-card__img-container mx-auto mt-2 product-card__cursor-pointer'
				onClick={handleClick}
			>
				<div>
					<img
						className='card-img-top'
						src={images[0] ? images[0].url : ankIcon}
						alt={title}
					/>
				</div>
				<div className='rating-container'>
					<ProductRating ratings={ratings} customStyle='text-center pt-2' />
				</div>
			</div>
			<div
				className='card-body product-card__cursor-pointer'
				onClick={handleClick}
			>
				<div className='product-card__price-container text-left'>
					<span className='product-price_dorlar my-auto'>$</span>
					<span className='product-price'>
						{(Math.round(price * 100) / 100).toFixed(2)}
					</span>
				</div>
				<h5 className='card-title product-title'>
					<Link to={`/product/${slug}`}>
						<span className='text-dark '>{title}</span>
					</Link>
				</h5>
				<p className='card-text product-description'>
					{ description }
				</p>
			</div>
			<div className='card-footer'>
				<div className='product-card__btn-container'>
					<div className='row justify-content-center align-self-center'>
						<div className='col-12'>
							<AddToCart product={product} />
						</div>
						<div className='col-12'>
							<AddToWishlist user={user} id={_id} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
