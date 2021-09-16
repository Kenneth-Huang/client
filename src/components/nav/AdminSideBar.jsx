import React from 'react';
import { Link } from 'react-router-dom';

function AdminSideBar(props) {
	return (
		<nav>
			<ul className='nav flex-column'>
				<li className='nav-item'>
					<Link to={`/admin/dashboard`} className='nav-link'>
						My account
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={`/admin/product`} className='nav-link'>
						product
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/products' className='nav-link'>
						products
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={`/admin/category`} className='nav-link'>
						category
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/subcategory' className='nav-link'>
						subcategory
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/admin/coupon' className='nav-link'>
						Coupon
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={`/user/password`} className='nav-link'>
						Password
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default AdminSideBar;
