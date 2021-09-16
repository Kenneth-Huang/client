import React, { useState, useEffect } from 'react';
import {
	getWishlist,
	addProductToWishlist,
	removeProductFromWishlist,
} from '../../helpers/requests/wishlist';

function BtnAddToWishlist({ user, id }) {
	const [isInWishlist, setInWishlist] = useState(false);
	useEffect(() => {
		checkInWishlist();
		// eslint-disable-next-line
	}, []);

	const checkInWishlist = async () => {
		if (user && user.token) {
			await getWishlist(user.token, id).then((data) => {
				setInWishlist(data.map((i) => i._id).includes(id));
			});
		}
	};

	const handleAddToWishlist = async (e) => {
		e.preventDefault();
		if (user && user.token) {
			if (isInWishlist)
				await removeProductFromWishlist(user.token, id)
					.then((res) => {
						setInWishlist(false);
					})
					.catch((err) => console.log(err.message));
			else
				await addProductToWishlist(user.token, id)
					.then((res) => {
						setInWishlist(true);
					})
					.catch((err) => console.log(err.message));
		}
	};

	return (
		<div
			className='btn btn-block btn-outline-primary font-weight-normal mb-1'
			onClick={handleAddToWishlist}
		>
			{isInWishlist ? (
				<i className='fas fa-heart text-danger'>
					<span className='text-dark'>Remove</span>
				</i>
			) : (
				<i className='far fa-heart'>Add to wishlist</i>
			)}
		</div>
	);
}

export default BtnAddToWishlist;
