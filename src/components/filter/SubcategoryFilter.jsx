import React from 'react';

function SubcategoryFilter({
	categoryCheckList,
	subcategories,
	selectedSubcategory,
	setSelectedSubcategory,
	triggerFilter,
}) {
	const onSubcategoriesChange = (id) => {
		setSelectedSubcategory(id);
		triggerFilter();
	};

	return (
		<div className='container mb-2'>
			<div className='row'>
				{subcategories &&
					subcategories.map((s) => {
						return categoryCheckList.find((c) => c === s.parent) ? (
							<div
								key={s._id}
								className={`col btn btn-outlined-primary btn-sm btn-raised btn-block m-3${
									selectedSubcategory === s._id ? ' bg-primary' : ''
								}`}
								onClick={() => onSubcategoriesChange(s._id)}
							>
								{s.name}
							</div>
						) : (
							''
						);
					})}
			</div>
			{selectedSubcategory ? (
				<div
					className='btn btn-primary btn-block'
					onClick={() => onSubcategoriesChange('')}
				>
					clear
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default SubcategoryFilter;
