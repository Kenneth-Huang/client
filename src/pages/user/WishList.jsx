import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserSideBar from '../../components/nav/UserSideBar';
import {
	getWishlist,
	removeProductFromWishlist,
} from '../../helpers/requests/wishlist';
import { Link } from 'react-router-dom';
import { DeleteOutlined, ShopOutlined } from '@ant-design/icons';

function WishList() {
	const [isLoading, setLoading] = useState(false);
	const [wishlist, setWishlist] = useState([]);
	const { user } = useSelector((state) => state);

	useEffect(() => {
		loadWishlist(user);
	}, [user]);

	const loadWishlist = async (user) => {
		setLoading(true);
		if (user && user.token) {
			await getWishlist(user.token)
				.then((data) => setWishlist(data))
				.catch((error) => console.error(error.message))
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const handleRemove = async (id) => {
		if (
			user &&
			user.token &&
			window.confirm('Are you sure want to remove this?')
		)
			await removeProductFromWishlist(user.token, id)
				.then(({ user }) => {
					setWishlist(user.wishlist);
				})
				.catch((err) => console.log(err.message));
	};

	return (
		<div className='container-fluid mt-3'>
			<div className='row'>
				<div className='col-md-2'>
					<UserSideBar />
				</div>
				<div className='col-md-6 offset-md-1'>
					{isLoading ? (
						<h4 className='text-danger'>Loading...</h4>
					) : (
						<h4>Wish List</h4>
					)}
					{wishlist && wishlist.length > 0
						? wishlist.map((product) => (
								<div className='alert alert-secondary' key={product._id}>
									{product.title}
									{'\u00A0'}
									<span
										onClick={() => handleRemove(product._id)}
										className='btn btn-sm float-right'
									>
										<DeleteOutlined className='text-danger' />
									</span>
									<Link to={`/product/${product.slug}`} target='_blank'>
										<span className='btn btn-sm float-right'>
											<ShopOutlined className='text-info' />
										</span>
									</Link>
								</div>
						  ))
						: 'No product in wishlist yet'}
				</div>
			</div>
		</div>
	);
}

export default WishList;
