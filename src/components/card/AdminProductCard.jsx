import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ankIcon from '../../image/ank.svg';
import { Card } from 'antd';
const { Meta } = Card;

function AdminProductCard({ product, handleProductDelete }) {
	const { title, description, images, slug } = product;

	return (
		<Card
			// hoverable
			className='mx-auto'
			style={{ width: 240, objectFit: 'cover' }}
			cover={
				<img
					alt={title}
					src={images[0] ? images[0].url : ankIcon}
					className='p-1'
				/>
			}
			actions={[
				<Link to={`/admin/product/${slug}`}>
					<span className='btn btn-sm font-weight-normal text-info'>
						<EditOutlined key='edit' />
						{'\u00A0'}
						Edit
					</span>
				</Link>,
				<span
					className='btn btn-sm font-weight-normal text-danger'
					onClick={handleProductDelete}
				>
					<DeleteOutlined />
					{'\u00A0'}
					Delete
				</span>,
			]}
		>
			<Meta
				title={title}
				description={
					description && description.length > 20
						? `${description.substring(0, 20)}...`
						: description
				}
			/>
		</Card>
	);
}

export default AdminProductCard;
