import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as imageService from '../../helpers/requests/images';
import Resizer from 'react-image-file-resizer';
import { Avatar, Image, Badge } from 'antd';
import { Spin } from 'antd';

function ImgUpload({ setProduct, product }) {
	const { user } = useSelector((state) => state);
	const [isLoading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { files } = e.target;
		const { images } = product;
		if (files)
			if (user && user.token) {
				Array.from(files).forEach((file) => {
					Resizer.imageFileResizer(
						file,
						720,
						720,
						'JPEG',
						100,
						0,
						(uri) => {
							upLoadImage(user.token, uri, images);
						},
						'base64'
					);
				});
			}
	};

	const upLoadImage = async (token, file, images) => {
		setLoading(true);
		await imageService
			.upLoadImage(token, file)
			.then((res) => {
				images.push(res);
				setProduct({ ...product, images });
			})
			.catch((err) => {
				console.log('upload image failed:', err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const deleteImage = async (token, public_id) => {
		const { images } = product;
		setLoading(true);

		await imageService
			.removeImage(token, public_id)
			.then((res) => {
				const filterImg = images.filter(
					(image) => image.public_id !== public_id
				);
				setProduct({
					...product,
					images: filterImg,
				});
			})
			.catch((err) => {
				console.log('remove image failed:', err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<div className=' row'>
				{product.images.length > 0 &&
					product.images.map((image) => (
						<div className='card m-2 text-center' key={image.public_id}>
							<Avatar
								src={<Image src={image.url} alt='chosen' />}
								shape='square'
								size={100}
								className='ml-3'
								style={{ backgroundColor: '#fde3cf' }}
							/>

							<div className='text-center'>
								<Badge
									count='X'
									key={image.public_id}
									style={{ cursor: 'pointer', width: '100%' }}
									onClick={(e) => {
										deleteImage(user.token, image.public_id);
									}}
								></Badge>
							</div>
						</div>
					))}
			</div>
			<div className='row'>
				<div className='d-flex justify-content-between'>
					<label className='btn btn-primary btn-raised' aria-disabled='true'>
						Choose Image Files
						<input
							type='file'
							multiple
							hidden={true}
							accept='images/*'
							onChange={handleChange}
						/>
					</label>
					<div className='align-self-center'>{isLoading && <Spin />}</div>
				</div>
			</div>
		</>
	);
}

export default ImgUpload;
