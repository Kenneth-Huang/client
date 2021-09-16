import React from 'react';

function LocalSearch({ keywords, setKeywords }) {
	const handleKeywordChange = (e) => {
		e.preventDefault();
		setKeywords(e.target.value.toLowerCase());
	};

	return (
		// <div className='container-fluid pt-4 pb-4'>
		<input
			type='search'
			placeholder='Enter keywords'
			value={keywords}
			onChange={handleKeywordChange}
			className='form-control mb-4'
		/>
		// </div>
	);
}

export default LocalSearch;
