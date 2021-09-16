import React from 'react';
import '../../style/colorbox.css'

function ColorFilter({ productColors, color, setColor, triggerFilter }) {
	const onColorChange = (color) => {
		setColor(color);
		triggerFilter();
	};
	return (
		<div className='container mb-2'>
			<div className='row'>
				{productColors &&
					productColors.map((c, index) => {
						return (
							<div
								key={index}
								className='col-2'
							>
								<div className={`mx-auto my-3 color-box${c===color?'--selected':''} ${c.toLowerCase()}`} onClick={() => onColorChange(c)}></div>
							</div>
						);
					})}
			</div>
			{color ? (
				<div
					className='btn btn-primary btn-block'
					onClick={() => setColor('')}
				>
					clear
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default ColorFilter;
