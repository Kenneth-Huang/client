import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	DataTableCell,
} from '@david.kucsai/react-pdf-table';
import { pdfPageStyle } from './pdfPageStyle';

function Invoice({ order }) {
	return (
		<Document>
			<Page size='A4' style={pdfPageStyle.body}>
				<Text style={pdfPageStyle.header}>
					------------------------------------------------
					{new Date().toLocaleString()}
					------------------------------------------------
				</Text>
				<Text style={pdfPageStyle.title}>Order Invoice</Text>
				<Text style={pdfPageStyle.author}>ANK studio</Text>
				<Text style={pdfPageStyle.subtitle}>Summary</Text>
				{/* </View> */}
				<Text style={pdfPageStyle.text}>
					<Text>
						Order ID:
						{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
						{order._id}
					</Text>
					{'\n'}
					<Text>
						Order Date:{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
						{new Intl.DateTimeFormat('en-US', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						}).format(order.created)}
					</Text>
					{'\n'}
					<Text>
						Total Paid: {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}${' '}
						{(order.paymentIntent.amount / 100).toFixed(2)}
					</Text>
					{'\n'}
					<Text>
						Order Status: {'\u00A0\u00A0'}
						{order.status}
					</Text>
				</Text>

				<Table>
					<TableHeader>
						<TableCell>Title</TableCell>
						<TableCell>Brand</TableCell>
						<TableCell>Color</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Quantity</TableCell>
					</TableHeader>
				</Table>
				<Table data={order.products}>
					<TableBody>
						<DataTableCell getContent={(item) => item.product.title} />
						<DataTableCell getContent={(item) => item.product.brand} />
						<DataTableCell getContent={(item) => item.color} />
						<DataTableCell getContent={(item) => `$${item.product.price}`} />
						<DataTableCell getContent={(item) => item.count} />
					</TableBody>
				</Table>
				<Text style={pdfPageStyle.footer}>
					---Thank You for Shopping with ANK---
				</Text>
			</Page>
		</Document>
	);
}

export default Invoice;
