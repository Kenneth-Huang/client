import React, { useState, useEffect } from 'react';
import {
	getProductsCountByFilter,
	getProductByFilter,
} from '../../helpers/requests/product';
import FilteredCardList from '../../components/list/FilteredCardList';

function SubcategoryHome({ match }) {
	const { slug } = match.params;
	const [subcategory, setSubcategory] = useState({});
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [productCount, setProductCount] = useState(0);
	// import { toast } from 'react-toastify';

	const countPerpage = 4;

	useEffect(() => {
		loadProductsBySubcategorySlug(
			slug,
			{ createdAt: -1 },
			countPerpage,
			currentPage
		);
	}, [slug, currentPage]);

	useEffect(() => {
		loadProductsCount(slug);
	}, [slug]);

	const loadProductsBySubcategorySlug = async (
		slug,
		sort,
		countPerpage,
		currentPage
	) => {
		setLoading(true);
		await getProductByFilter(
			{
				type: 'subcategory',
				slug,
			},
			{ createdAt: -1 },
			countPerpage,
			currentPage
		)
			.then((res) => {
				setSubcategory(res.subcategory);
				setProducts(res.products);
			})
			.catch((err) => console.error(err.message))
			.finally(() => setLoading(false));
	};

	const loadProductsCount = async (slug) => {
		setLoading(true);
		return await getProductsCountByFilter({ type: 'subcategory', slug })
			.then(({ counts }) => setProductCount(counts))
			.catch((err) => {
				console.error('Error in get product count:', err.message);
			})
			.finally(setLoading(false));
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div>
			<h4 className='jumbotron text-center p3 mt-5 mb-5 display-4'>
				{isLoading ? (
					<span className='text-danger'>Loading...</span>
				) : (
					`Subcategory: ${subcategory.name}`
				)}
			</h4>
			<FilteredCardList
				products={products}
				isLoading={isLoading}
				currentPage={currentPage}
				countPerpage={countPerpage}
				productCount={productCount}
				handlePageChange={handlePageChange}
			/>
		</div>
	);
}

export default SubcategoryHome;
