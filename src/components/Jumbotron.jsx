import React from 'react';
import Typewriter from 'typewriter-effect';

function Jumbotron({ textArray }) {
	return (
		<Typewriter
			options={{
				strings: textArray,
				loop: true,
				autoStart: true,
			}}
		/>
	);
}

export default Jumbotron;
