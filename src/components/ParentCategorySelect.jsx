import React from 'react';

function ParentCategorySelect({ categories, categoryId, setCategoryId }) {
	return (
		<div className='form-group'>
			<label htmlFor='subcategory'>Parent Category</label>
			<select
				name='subcategory'
				id='subcategory'
				className='form-control'
				onChange={(e) => setCategoryId(e.target.value)}
				value={categoryId}
			>
				<option value=''>Please select a parent category</option>
				{categories.length > 0 &&
					categories.map((category) => (
						<option key={category._id} value={category._id}>
							{category.name}
						</option>
					))}
			</select>
		</div>
	);
}

export default ParentCategorySelect;
