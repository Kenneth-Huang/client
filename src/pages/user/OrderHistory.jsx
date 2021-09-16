import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserSideBar from '../../components/nav/UserSideBar';
import Spinner from '../../components/Spinner';
import OrderCard from '../../components/card/OrderCard';
import { getOrders } from '../../helpers/requests/order';
import { toast } from 'react-toastify';

function OrderHistory({ History }) {
	const [orders, setOrders] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const { user } = useSelector((state) => state);

	useEffect(() => {
		setLoading(true);
		if (user && user.token)
			getOrders(user.token)
				.then((res) => {
					setOrders(res);
				})
				.catch((err) => {
					toast.error(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
	}, [user]);

	return (
		<div className='container-fluid mt-3'>
			<div className='row'>
				<div className='col-md-2'>
					<UserSideBar />
				</div>
				<div className='col-md-6 offset-md-1'>
					{isLoading ? (
						<h4 className='text-danger'>
							Loading Orders{'\u00A0'}
							<Spinner isShow='true' />
						</h4>
					) : (
						<h4>Orders</h4>
					)}
					{orders && orders.length > 0
						? orders.map((order) => (
								<OrderCard order={order} user={user} key={order._id} />
						  ))
						: 'No orders found'}
				</div>
			</div>
		</div>
	);
}

export default OrderHistory;
