import React from 'react';
import UserSideBar from '../../components/nav/UserSideBar';

function UserAccount({ history }) {
	return (
		<div className='container-fluid mt-3'>
			<div className='row'>
				<div className='col-md-2'>
					<UserSideBar />
				</div>
				<div className='col'>UserAccount Information</div>
			</div>
		</div>
	);
}

export default UserAccount;
