import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminSideBar from '../../components/nav/AdminSideBar';
import { getOrders, updateOrderStatus } from '../../helpers/requests/admin';
import { refundPayment } from '../../helpers/requests/payment';
import { toast } from 'react-toastify';
import OrderCard from '../../components/card/OrderCard';
import { ORDER_STATUS, PAYMENT_METHOD, PAYMENT_STATUS } from '../../constants';

function AdminDashboard() {
	const [isLoading, setLoading] = useState(false);
	const [orders, setOrders] = useState([]);
	const { user } = useSelector((state) => state);

	useEffect(() => {
		loadOrders(user);
	}, [user]);

	const loadOrders = async (user) => {
		setLoading(true);
		if (user && user.token)
			await getOrders(user.token)
				.then((res) => setOrders(res))
				.catch((err) => {
					toast.error(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
	};

	const isCash = (order, paymentMethod) => {
		return (
			order.paymentIntent.payment_method_types[0].toUpperCase() ===
			paymentMethod.CASH
		);
	};

	const isRefundable = ({ paymentIntent }, paymentMethod) => {
		return (
			paymentIntent.payment_method_types[0].toUpperCase() ===
				paymentMethod.CARD &&
			paymentIntent.status.toUpperCase() ===
				PAYMENT_STATUS.SUCCESS.toUpperCase()
		);
	};

	const setPaymentStatus = (orderStatus, isCash) => {
		return isCash
			? orderStatus === ORDER_STATUS.COMPLETED
				? PAYMENT_STATUS.SUCCESS
				: orderStatus === ORDER_STATUS.CANCELLED
				? PAYMENT_STATUS.CANCELLED
				: PAYMENT_STATUS.CASH_ON_DELIVERY
			: orderStatus === ORDER_STATUS.CANCELLED
			? PAYMENT_STATUS.REFUND
			: '';
	};

	const handleCancelOrderAndRefund = async (
		user,
		order,
		newStatus,
		paymentStatus
	) => {
		await refundPayment(user.token, order.paymentIntent)
			.then(async (res) => {
				await updateOrderStatus(
					user.token,
					order._id,
					newStatus,
					paymentStatus
				).then((res) => {
					loadOrders(user);
					toast.success(res);
				});
			})
			.catch((err) => toast.error(err.message))
			.finally(() => setLoading(false));
	};

	const handleStatusChange = async (user, order, newStatus) => {
		setLoading(true);
		if (user && user.token) {
			let paymentStatus = setPaymentStatus(
				newStatus,
				isCash(order, PAYMENT_METHOD)
			);
			if (
				newStatus === ORDER_STATUS.CANCELLED &&
				isRefundable(order, PAYMENT_METHOD)
			)
				handleCancelOrderAndRefund(user, order, newStatus, paymentStatus);
			else
				await updateOrderStatus(user.token, order._id, newStatus, paymentStatus)
					.then((res) => {
						loadOrders(user);
						toast.success(res);
					})
					.catch((err) => toast.error(err.message))
					.finally(() => setLoading(false));
		}
	};

	return (
		<div className='container-fluid mt-3'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminSideBar />
				</div>
				<div className='col-md-10'>
					{isLoading ? (
						<h4 className='text-danger'>Loading...</h4>
					) : (
						<h4>Admin Dashboard, Orders</h4>
					)}
					{orders && orders.length > 0
						? orders.map((order) => (
								<OrderCard
									order={order}
									user={user}
									key={order._id}
									handleStatusChange={(e) =>
										handleStatusChange(user, order, e.target.value)
									}
								/>
						  ))
						: 'No orders found'}
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
