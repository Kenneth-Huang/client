import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

function CategoryFilter({ categories, setCategoryCheckList, triggerFilter }) {
	const onChange = (list) => {
		setCategoryCheckList(list);
		triggerFilter();
	};

	return (
		<CheckboxGroup style={{ width: '90%', margin: '10px' }} onChange={onChange}>
			{categories.map((c) => (
				<div key={c._id}>
					<Checkbox value={c._id} className='pb-2 pl-4 pr-4'>
						{c.name}
					</Checkbox>
				</div>
			))}
		</CheckboxGroup>
	);
}

export default CategoryFilter;
