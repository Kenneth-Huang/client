import React from 'react';
import { Link } from 'react-router-dom';

function UserSideBar(props) {
	return (
		<nav>
			<ul className='nav flex-column'>
				<li className='nav-item'>
					<Link to={`/user/order-history`} className='nav-link'>
						Order History
					</Link>
				</li>
				<li className='nav-item'>
					<Link to={`/user/password`} className='nav-link'>
						Password
					</Link>
				</li>
				<li className='nav-item'>
					<Link to='/user/wishlist' className='nav-link'>
						Wish list
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default UserSideBar;
