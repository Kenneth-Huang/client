import React from 'react';
import { USER_ROLES } from '../../constants';
import {
	SolutionOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function LoginSubmenu({ user, logout, setNavItemClassName }) {
	const getDashboardLink = user => {
		let link = '/';
		if (user&&user.role === USER_ROLES.SUBSCRIBER) link = '/user/order-history';
		else if (user&&user.role === USER_ROLES.ADMIN) link = '/admin/dashboard';
		return link;
	}

	return (
		<ul className='navbar-nav'>
		{user ? (
			<li className='nav-item dropdown'>
				<span className='nav-link dropdown-toggle py-3' id='loginSubMenuDropdown' role='button' data-toggle='dropdown' >
					<SolutionOutlined /> { user.username}
				</span>
				<div className='dropdown-menu' aria-labelledby='loginSubMenuDropdown'>
						<span className='dropdown-item'><Link to={ getDashboardLink(user) }><SolutionOutlined /> Dashboard</Link></span>
					<div className='dropdown-divider'></div>
					<span className='dropdown-item' onClick={logout}><LogoutOutlined /> Logout</span>
				</div>
			</li>
		) :
			(
			<>
				<li className={setNavItemClassName('register')}>
					<Link to='/register'><span className='nav-link'>Register </span></Link>
				</li>
				<li className={setNavItemClassName('login')}>
					<Link to='login'><span className='nav-link'>Login</span></Link>
				</li>
			</>
		)
		}
	</ul>
	)
}

export default LoginSubmenu
