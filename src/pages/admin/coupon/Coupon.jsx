import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminSideBar from '../../../components/nav/AdminSideBar';
import * as couponRequest from '../../../helpers/requests/coupon';
import { DeleteOutlined } from '@ant-design/icons';
import LocalSearch from '../../../components/form/LocalSearch';
import CouponForm from '../../../components/form/CouponForm';

function Coupon() {
	const [isLoading, setLoading] = useState(false);
	const [coupons, setCoupons] = useState([]);
	const [keywords, setKeywords] = useState('');
	const [name, setName] = useState('');
	const [discount, setDiscount] = useState(0);
	const [expiry, setExpiry] = useState(new Date());

	const { user } = useSelector((state) => state);

	const filterConditon = (keywords) => {
		if (keywords.length > 2)
			return (item) => item.name.toLowerCase().includes(keywords);
		return () => true;
	};

	useEffect(() => {
		loadCoupons();
	}, []);

	const loadCoupons = async () => {
		setLoading(true);
		await couponRequest
			.getAllCoupons()
			.then((data) => {
				setCoupons(data);
			})
			.catch((err) => toast.error('error in getting coupons:' + err.message))
			.finally(() => {
				setLoading(false);
			});
	};
	const handleRemove = async (id) => {
		if (window.confirm('Are you sure want to delete?')) {
			setLoading(true);
			if (user)
				await couponRequest
					.removeCoupon(user.token, id)
					.then((c) => {
						toast.success(`Coupon ${c.name}removed successfully`);
						loadCoupons();
					})
					.catch((err) => {
						toast.error('Unable to remove coupon' + err.message);
					});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (user) {
			setLoading(true);
			await couponRequest
				.createCoupon(user.token, { name, expiry, discount })
				.then((c) => {
					toast.success(`coupon ${c.name} created`);
					setName('');
					setExpiry(new Date());
					setDiscount(0);
					loadCoupons();
				})
				.catch((err) => {
					toast.error(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	return (
		<div className='container-fluid mt-3'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminSideBar />
				</div>
				<div className='col'>
					{isLoading ? (
						<h4 className='text-danger'>Loading...</h4>
					) : (
						<h4>Create coupon</h4>
					)}
					<CouponForm
						name={name}
						setName={setName}
						discount={discount}
						setDiscount={setDiscount}
						expiry={expiry}
						setExpiry={setExpiry}
						handleSubmit={handleSubmit}
					/>
					<hr />
					<LocalSearch keywords={keywords} setKeywords={setKeywords} />
					<table className='table table-bordered'>
						<thead className='thead-light'>
							<tr>
								<th>Name</th>
								<th>Discount</th>
								<th>Expiry</th>
								<th>action</th>
							</tr>
						</thead>
						<tbody>
							{coupons.length > 0
								? coupons.filter(filterConditon(keywords)).map((c) => (
										<tr c key={c._id}>
											<td>{c.name}</td>
											<td>{c.discount}%</td>
											<td>{new Date(c.expiry).toLocaleString()}</td>
											<td>
												<span
													onClick={() => handleRemove(c._id)}
													className='btn btn-sm'
												>
													<DeleteOutlined className='text-danger' />
												</span>
											</td>

											{/* <Link to={`/admin/category/${category.slug}`}>
									<span className='btn btn-sm float-right'>
										<EditOutlined className='text-info' />
									</span>
								</Link> */}
										</tr>
								  ))
								: 'No coupon yet.'}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Coupon;
