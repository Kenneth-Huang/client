import React, { useState, useEffect } from 'react';
import {
	getProductsCountByFilter,
	// getProductsByCategorySlugAndPageCount,
	getProductByFilter,
} from '../../helpers/requests/product';
import FilteredCardList from '../../components/list/FilteredCardList';

function CategoryHome({ match }) {
	const { slug } = match.params;
	const [category, setCategory] = useState({});
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [productCount, setProductCount] = useState(0);
	// import { toast } from 'react-toastify';

	const countPerpage = 4;

	useEffect(() => {
		loadProductsByCategorySlug(
			slug,
			{ createdAt: -1 },
			countPerpage,
			currentPage
		);
	}, [slug, currentPage]);

	useEffect(() => {
		loadProductsCount(slug);
		// eslint-disable-next-line
	}, []);

	const loadProductsByCategorySlug = (
		slug,
		sort,
		countPerpage,
		currentPage
	) => {
		setLoading(true);
		getProductByFilter(
			{
				type: 'category',
				slug,
			},
			{ createdAt: -1 },
			countPerpage,
			currentPage
		)
			.then((res) => {
				setCategory(res.category);
				setProducts(res.products);
			})
			.catch((err) => console.error(err.message))
			.finally(() => setLoading(false));
	};

	const loadProductsCount = async (slug) => {
		setLoading(true);
		return await getProductsCountByFilter({ type: 'category', slug })
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
					`Category: ${category.name}`
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

export default CategoryHome;
