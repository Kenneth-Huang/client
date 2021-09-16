import React from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

function ProductForm({
	product,
	productColors,
	productBrands,
	categories,
	subcategories,
	handleSubmit,
	handleChange,
	handleCategoryChange,
	handleSubcategoryChange,
	isLoading,
}) {
	const {
		title,
		description,
		price,
		category,
		subcategory,
		shipping,
		quantity,
		color,
		brand,
	} = product;

	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<div className='form-group'>
					<label htmlFor='title'>Title</label>
					<input
						name='title'
						type='text'
						className='form-control'
						onChange={handleChange}
						value={title}
						autoFocus
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='title'>Description</label>
					<input
						name='description'
						type='text-area'
						className='form-control'
						onChange={handleChange}
						value={description}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='price'>Price</label>
					<input
						name='price'
						type='number'
						className='form-control'
						onChange={handleChange}
						value={price}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='shipping'>Shipping</label>
					<select
						name='shipping'
						onChange={handleChange}
						className='form-control'
						value={shipping}
					>
						<option value=''>Please select whether shipping</option>
						<option value='Yes'>Yes</option>
						<option value='No'>No</option>
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='quantity'>Quantity</label>
					<input
						name='quantity'
						type='number'
						className='form-control'
						onChange={handleChange}
						value={quantity}
						required
						min='1'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='color'>Color</label>
					<select
						name='color'
						onChange={handleChange}
						className='form-control'
						value={color}
					>
						<option value=''>Please select a color</option>
						{productColors.length &&
							productColors.map((color) => {
								return (
									<option value={color} key={color}>
										{color}
									</option>
								);
							})}
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='category'>Category</label>
					<select
						name='category'
						onChange={handleCategoryChange}
						className='form-control'
						disabled={!categories.length}
						value={category._id}
					>
						<option value=''>Please select a category</option>
						{categories.map((c) => {
							return (
								<option value={c._id} key={c._id}>
									{c.name}
								</option>
							);
						})}
					</select>
				</div>
				{subcategories && subcategories.length > 0 && (
					<div className='form-group'>
						<label htmlFor='subcategory'>Subcategory</label>
						<Select
							name='subcategory'
							mode='multiple'
							allowClear
							style={{ width: '100%' }}
							placeholder='Please select subcategories'
							onChange={handleSubcategoryChange}
							disabled={!subcategories.length}
							defaultValue={subcategory && subcategory.map((s) => s._id)}
						>
							{subcategories.map((s) => {
								return (
									<Option value={s._id} key={s._id}>
										{s.name}
									</Option>
								);
							})}
						</Select>
					</div>
				)}
				<div className='form-group'>
					<label htmlFor='brand'>Brand</label>
					<select
						name='brand'
						onChange={handleChange}
						className='form-control'
						value={brand}
					>
						<option value=''>Please select a brand</option>
						{productBrands.length &&
							productBrands.map((brand) => {
								return (
									<option value={brand} key={brand}>
										{brand}
									</option>
								);
							})}
					</select>
				</div>
				<br />
				<div className='d-flex justify-content-between'>
					<button className='btn btn-outline-primary'>Save</button>
				</div>
				<div className='align-self-center'>{isLoading && <Spin />}</div>
			</div>
		</form>
	);
}

export default ProductForm;
