import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import {
	DesktopOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import firebase from 'firebase';
import { userConstants, cartConstants } from '../../redux/constants';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../form/SearchForm';
import '../../style/header.css';
import logo from '../../image/icon-ank-small.png';
import CategorySubmenu from './CategorySubmenu';
import LoginSubmenu from './LoginSubmenu';

function Header() {
	const [current, setCurrent] = useState('');
	const dispatch = useDispatch();
	let { user, cart } = useSelector((state) => state);

	useEffect(() => {
		let path = window.location.pathname;
		if (path === '/') setCurrent('home');
		else if (path.includes('shop')) setCurrent('shop');
		else setCurrent(path.substring(1));
	}, []);

	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: userConstants.LOGOUT,
			payload: null,
		});
		dispatch({ type: cartConstants.EMPTY_CART });
	};

	const setNavItemClassName = (itemName) => current === itemName ? 'nav-item active' : 'nav-item';

	return (
		<header>
			<nav className='navbar navbar-dark bg-primary'>
				<div className='row w-100 mx-auto align-items-center'>
					<div className='col-md-6'>
						<a className='navbar-brand' href='/'>
							<img src={ logo } className='d-inline-block align-top' alt='ANK'/>
						</a>
					</div>
					<div className='col-md-6'>
						<SearchForm />
					</div>
				</div>
			</nav>	
			<nav className='navbar navbar-expand-lg navbar-light py-0 px-3'>
				<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<CategorySubmenu/>
					<ul className='navbar-nav mr-auto'>
						<li className={setNavItemClassName('home')}>
							<Link to='/'><span className='nav-link py-3'><DesktopOutlined /> Home</span></Link>
						</li>
						<li className={setNavItemClassName('shop') }>
							<Link to='/shop'><span className='nav-link py-3'><ShopOutlined /> Shop</span></Link>
						</li>
						<li className={setNavItemClassName('cart')}>
							<Link to='/cart'>
								<span className='nav-link py-3'><ShoppingCartOutlined /> <Badge count={cart && cart.length ? cart.length : 0} offset={[5]}>
								Cart
								</Badge></span>
							</Link>
						</li>
					</ul>
					<LoginSubmenu user={user} logout={logout} setNavItemClassName={setNavItemClassName}/>
				</div>
			</nav>	
		</header>
	);
}

export default Header;
