import React, { useState } from 'react';
import { Modal } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import {
	getProductRating,
	setProductRating,
} from '../../helpers/requests/product';

function ProductRatingModal({
	user,
	star,
	setStar,
	loadSingleProduct,
	children,
}) {
	const [isVisible, setVisible] = useState(false);
	const history = useHistory();
	const { slug } = useParams();

	const handleClick = () => {
		if (user && user.token) {
			getProductRating(user.token, slug)
				.then((res) => {
					setStar(res.star);
					setVisible(true);
				})
				.catch((err) => {
					toast.error(err.message, 'Please re-login');
					if (
						err.message &&
						err.message.includes('Firebase ID token has expired')
					)
						window.location.reload();
				});
			return;
		}
		history.push({
			pathname: '/login',
			state: { from: `/product/${slug}` },
		});
	};

	return (
		<>
			<div onClick={handleClick}>
				<StarOutlined className='text-danger' />
				<br />
				{user ? 'Leave rating' : 'Please log in to rate'}
			</div>
			<Modal
				title='Product rating'
				center
				visible={isVisible}
				onOk={() => {
					setVisible(false);
					if (user && user.token) {
						setProductRating(user.token, slug, star).then(() =>
							loadSingleProduct(slug)
						);
					}
					toast.success('Rating successfully, results will be updated soon.');
				}}
				onCancel={() => setVisible(false)}
			>
				{children}
			</Modal>
		</>
	);
}

export default ProductRatingModal;
