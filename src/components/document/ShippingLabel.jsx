import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';

import { ADDRESS_STATES } from '../../constants';
import { pdfPageStyle } from './pdfPageStyle';

function ShippingLabel({ order }) {
	const { address, username } = order.orderedBy;

	const shortenState = (state) => {
		switch (state.toUpperCase()) {
			case ADDRESS_STATES.QUEENSLAND:
				return 'QLD';
			case ADDRESS_STATES.NEW_SOUTH_WALES:
				return 'NSW';
			case ADDRESS_STATES.SOUTH_AUSTRALIA:
				return 'SA';
			case ADDRESS_STATES.VICTORIA:
				return 'VIC';
			default:
				return state.toUpperCase();
		}
	};

	return (
		<Document>
			<Page size='A6' style={pdfPageStyle.body} orientation='landscape'>
				<Text style={pdfPageStyle.subtitle}>DELIVERY TO</Text>
				<Text style={pdfPageStyle.text}>
					<Text>{username}</Text>
					{'\n'}
					<Text>{address.street}</Text>
					{'\n'}
					<Text>
						{address.sub}
						{'\u00A0\u00A0'}
						{shortenState(address.state)}
						{'\u00A0\u00A0'}
						{address.code}
					</Text>
				</Text>
			</Page>
		</Document>
	);
}

export default ShippingLabel;
