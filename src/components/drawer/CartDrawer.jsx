import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';
import { drawerConstants } from '../../redux/constants';
import ankIcon from '../../image/ank.svg';
import { Link } from 'react-router-dom';

function CartDrawer() {
	const { drawer, cart } = useSelector((state) => state);
	const dispatch = useDispatch();

	const closeDraw = () => {
		dispatch({
			type: drawerConstants.SET_CARTDRAWER_VISIBLE,
			payload: false,
		});
	};

	return (
		<Drawer onClose={closeDraw} visible={drawer} closable={false}>
			{cart.map((p) => (
				<div className='row' key={p._id}>
					<div className='col'>
						<img
							src={p.images[0] ? p.images[0].url : ankIcon}
							alt={p.title}
							style={{
								height: '80px',
								width: '80%',
								objectFit: 'cover',
								margin: '0 auto',
								display: 'block',
							}}
						/>
						<p className='text-center bg-secondary text-light'>
							{p.title} *{p.count}
						</p>
					</div>
				</div>
			))}
			<Link to='/cart'>
				<button
					onClick={closeDraw}
					className='text-center btn btn-primary btn-raised btn-block'
				>
					Go to Cart
				</button>
			</Link>
		</Drawer>
	);
}

export default CartDrawer;
