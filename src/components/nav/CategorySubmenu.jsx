import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../../helpers/requests/category';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

function CategorySubmenu() {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getAllCategories()
			.then((res) => {
				setData(res);
			})
			.catch((err) => {
				console.log(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const showButtonList = (data) => {
		return data.map((i) => (
			<>
				<span className='dropdown-item' key={i.slug} href={`/category/${i.slug}`}><Link to={`/category/${i.slug}`}>{i.name}</Link></span>
				<div className='dropdown-divider'></div>
			</>
		));
	};

	return (
		<ul className='navbar-nav bg-primary'>
			<li className='nav-item dropdown'>
				<span className='nav-link dropdown-toggle py-3' id='categoryMenuDropdown' role='button' data-toggle='dropdown' >
					<Link to='/shop' className='text-white'>Shop by Category</Link>
				</span>
				<div className='dropdown-menu submenu' aria-labelledby='categoryMenuDropdown'>
					{isLoading ? (
							<div className='mx-auto'>
								{' '}
								<h4 className='text-center text-danger'>
									Loading...
									<Spinner isShow={true} />
								</h4>
							</div>
						) : (
							showButtonList(data)
						)}
				</div>
			</li>
		</ul>
	)
}

export default CategorySubmenu
