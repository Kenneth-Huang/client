import React from 'react';
import ProductList from '../list/ProductList';
import { USER_ROLES, ORDER_STATUS } from '../../constants';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../document/Invoice';
import ShippingLabel from '../document/ShippingLabel';
import { FilePdfOutlined } from '@ant-design/icons';

function OrderCard({ order, user, handleStatusChange }) {
	const { paymentIntent } = order;

	const showInvoiceLink = (order) => (
		<PDFDownloadLink
			document={<Invoice order={order} />}
			fileName={`invoice_${order._id}.pdf`}
			className='btn btn-info btn-sm btn-block btn-outline font-weight-bold'
		>
			<FilePdfOutlined />
			{'\u00A0\u00A0'}Download invoice
		</PDFDownloadLink>
	);

	const showShippingLabel = (order) => (
		<PDFDownloadLink
			document={<ShippingLabel order={order} />}
			fileName={`ShippingLabel_${order._id}.pdf`}
			className='btn btn-info btn-sm btn-block btn-outline font-weight-bold'
		>
			<FilePdfOutlined />
			{'\u00A0\u00A0'}Download Shipping Label
		</PDFDownloadLink>
	);

	const shwoStatusSelector = (order) => {
		return (
			<form className='form-inline mb-0 pb-0'>
				{/* <p>{JSON.stringify(order.orderedBy, null, 2)}</p> */}
				<span>Status:</span>
				{'\u00A0'}
				<select
					className='form-control form-inline'
					disabled={order.status === ORDER_STATUS.CANCELLED}
					onChange={(e) => {
						if (
							window.confirm(
								e.target.value === ORDER_STATUS.CANCELLED
									? 'Do you want to cancel the order and refund?'
									: 'Do you want to change the order status?'
							)
						)
							handleStatusChange(e);
						else e.target.value = order.status;
					}}
				>
					<option value={order.status}>{order.status}</option>

					{Object.values(ORDER_STATUS)
						.filter((s) => s !== order.status)
						.map((s, index) => {
							return (
								<option value={s} key={s + index}>
									{s}
								</option>
							);
						})}
				</select>
			</form>
		);
	};

	return (
		<div key={order._id} className='m-3 my-2 mb-5 p-3 card'>
			{/* <p className='text-info'>
				{JSON.stringify(order.paymentIntent, null, 2)}
			</p> */}
			<div className='row'>
				<div className='col-md-8'>
					<span>Order ID: {order._id}</span>
				</div>
				<div className='col-md-4'>
					<span className='float-right'>
						Order on:{' '}
						{new Intl.DateTimeFormat('en-US', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						}).format(order.created)}
					</span>
				</div>
				<div className='col-md-4'>
					{user && user.role === USER_ROLES.ADMIN ? (
						shwoStatusSelector(order)
					) : (
						<span className='badges text-info text-center'>
							Status: {order.status}
						</span>
					)}
				</div>
			</div>

			<br />
			<div className='row'></div>
			{/* {'\u00A0'} */}

			<table className='table table-bordered' key={order._id}>
				<thead className='thead-light'>
					<tr>
						<th>Image</th>
						<th>Titel</th>
						<th>Price</th>
						<th>Brand</th>
						<th>Color</th>
						<th>Count</th>
						<th>Shipping</th>
					</tr>
				</thead>
				<tbody>
					{order.products.map((p) => (
						<ProductList key={p._id} product={p} />
					))}
				</tbody>
			</table>
			<div className='row'>
				<div className='col-md-6'>
					<span>
						Amount:{' '}
						{(paymentIntent.amount / 100).toLocaleString('en-US', {
							style: 'currency',
							currency: 'AUD',
						})}
					</span>
					{'\u00A0\u00A0'}
					<span>Currency: {paymentIntent.currency.toUpperCase()}</span>
					{'\u00A0\u00A0'}
				</div>
				<div className='col-md-6'>
					<span className='float-right'>
						Method:{paymentIntent.payment_method_types[0]}
						{'\u00A0\u00A0'}
						Payment:{paymentIntent.status.toUpperCase()}{' '}
					</span>
				</div>
			</div>
			<br />
			<div className='row'>
				<div className='col'>
					<p className=''>
						{user && user.role === USER_ROLES.ADMIN
							? showShippingLabel(order)
							: showInvoiceLink(order)}
					</p>
				</div>
			</div>
		</div>
	);
}

export default OrderCard;
