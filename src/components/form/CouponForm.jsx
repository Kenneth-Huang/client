import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CouponForm({
	name,
	setName,
	discount,
	setDiscount,
	expiry,
	setExpiry,
	handleSubmit,
}) {
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<div className='form-group form-inline'>
					<label htmlFor='name' className='bmd-label-floating '>
						Name:
					</label>
					{'\u00A0'}
					<input
						type='text'
						className='form-control'
						onChange={(e) => setName(e.target.value.toUpperCase())}
						value={name}
						autoFocus
						required
						name='name'
						id='name'
					/>
					<br />
					<label htmlFor='discount' className='bmd-label-floating'>
						Discount(%):
					</label>
					{'\u00A0'}
					<input
						type='number'
						className='form-control'
						onChange={(e) => setDiscount(e.target.value)}
						value={discount}
						required
						name='discount'
						id='discount'
						min={0}
						max={100}
					/>
				</div>

				<br />
				<label htmlFor=''>Expiry Date</label>
				<DatePicker selected={expiry} onChange={(date) => setExpiry(date)} />
				<br />
				<br />
				<div className='row'>
					<div className='col-md-6'>
						<button className='btn btn-outline-primary float-right'>
							Save
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default CouponForm;
