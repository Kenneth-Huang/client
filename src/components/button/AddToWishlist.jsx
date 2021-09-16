import React, { useState, useEffect } from 'react';
import {
	getWishlist,
	addProductToWishlist,
	removeProductFromWishlist,
} from '../../helpers/requests/wishlist';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

function AddToWishlist({ user, id }) {
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
		<span
			className='btn btn-sm font-weight-normal text-info'
			onClick={handleAddToWishlist}
		>
			{isInWishlist ? (
				<>
					<HeartFilled />
					<br />
					Remove from wishlist
				</>
			) : (
				<>
					<HeartOutlined />
					<br />
					Add to wishlist
				</>
			)}
		</span>
	);
}

export default AddToWishlist;
