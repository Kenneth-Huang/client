import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import { getAllCategories } from '../../helpers/requests/category';
import { getAllSubcategories } from '../../helpers/requests/subcategory';

function FilterButtonList({ filter }) {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const getData = (filterType) => {
		if (filterType === 'category') {
			return getAllCategories();
		} else if (filterType === 'subcategory') {
			return getAllSubcategories();
		}
	};

	useEffect(() => {
		setLoading(true);
		getData(filter)
			.then((res) => {
				setData(res);
			})
			.catch((err) => {
				console.log(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
		// eslint-disable-next-line
	}, []);

	const showButtonList = (data) => {
		return data.map((i) => (
			<div
				key={i._id}
				className='col btn btn-outlined-primary btn-lg btn-raised btn-block m-3'
			>
				<Link to={`/${filter}/${i.slug}`}>{i.name}</Link>
			</div>
		));
	};

	return (
		<div className='container'>
			<div className='row'>
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
		</div>
	);
}

export default FilterButtonList;
