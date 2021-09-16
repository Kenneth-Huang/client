import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchConstants } from '../../redux/constants';

function SearchForm() {
	const { search } = useSelector((state) => state);
	const { searchText } = search;
	let dispatch = useDispatch();
	let history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		history.push(`/shop/${searchText}`);
	};

	const handleChange = (e) => {
		dispatch({
			type: searchConstants.SEARCH_QUERY,
			payload: {
				searchText: e.target.value,
			},
		});
	};
	return (
		<div className='container'>
			<form
				className='form my-2 my-lg-0 mr-auto w-100 form-search'
				onSubmit={handleSubmit}
			>
				<div className='form-group mb-0'>
					<div className='input-group align-items-center'>
						<input
							type='search'
							name='search'
							value={searchText}
							className='form-control'
							placeholder='Search...'
							onChange={handleChange}
						/>
						<button
							className='btn btn-dark text-white ml-0 px-3 rounded'
							type='submit'
							onClick={handleSubmit}
						>
							<i className='fas fa-search'></i>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default SearchForm;
