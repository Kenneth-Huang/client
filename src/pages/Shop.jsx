import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	searchFilter,
	getHighestPriceProduct,
} from '../helpers/requests/product';
import { getAllCategories } from '../helpers/requests/category';
import { getAllSubcategories } from '../helpers/requests/subcategory';

import FilteredCardList from '../components/list/FilteredCardList';
import ProductCardList from '../components/list/ProductCardList';
import { searchConstants } from '../redux/constants';
import {
	DollarOutlined,
	DownSquareOutlined,
	StarOutlined,
	TagsOutlined,
	BorderOutlined,
} from '@ant-design/icons';
import { Menu, Slider, Breadcrumb, Select } from 'antd';
import StarFilter from '../components/filter/StarFilter';
import CategoryFilter from '../components/filter/CategoryFilter';
import SubcategoryFilter from '../components/filter/SubcategoryFilter';
import ColorFilter from '../components/filter/ColorFilter';
import BrandFilter from '../components/filter/BrandFilter';
import { PRODUCT_COLORS, PRODUCT_BRANDS, DISPLAY_SORTED_BY, DISPLAY_SORT_ORDER } from '../constants';
const { SubMenu } = Menu;
const { Item } = Breadcrumb;
const { Option } = Select;

const initColors = (COLORS) => {
	let colors = [];
	for (const key in COLORS) {
		colors[colors.length] = COLORS[key];
	}
	return colors;
};
const initBrands = (BRANDS) => {
	let brands = [];
	for (const key in BRANDS) {
		brands[brands.length] = BRANDS[key];
	}
	return brands;
};

function Shop({ history, match }) {
	// const { query } = match.params;
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(false);
	//paginations
	const [currentPage, setCurrentPage] = useState(1);
	const countPerpage = 8;

	const [filterTrigger, setFilterTrigger] = useState(false);
	//text sarching
	const { searchText } = useSelector((state) => state.search);
	let dispatch = useDispatch();
	//Price slider
	const [maxPrice, setMaxPrice] = useState(0);
	const [price, setPrice] = useState([0, 0]);
	//category checkbox
	const [categories, setCategories] = useState([]);
	const [categoryCheckList, setCategoryCheckList] = useState([]);
	//Subcategory buttons
	const [subcategories, setSub] = useState([]);
	const [selectedSubcategory, setSelectedSubcategory] = useState('');
	//Rating filter
	const [star, setStar] = useState(0);
	//product color & brand
	const productColors = initColors(PRODUCT_COLORS);
	const [color, setColor] = useState('');
	const productBrands = initBrands(PRODUCT_BRANDS);
	const [brand, setBrand] = useState('');
	//ordered by
	const [sortedBy, setSortedBy] = useState(DISPLAY_SORTED_BY.SLUG);
	const [sortOrder, setSortOrder] = useState(DISPLAY_SORT_ORDER.ACS);

	useEffect(() => {
		async function loadData() {
			await getHighestPriceProduct()
				.then((res) => {
					const highestPrice = parseInt(res[0].price);
					setMaxPrice(highestPrice * 1.1);
					setPrice(0, highestPrice);
				})
				.catch((err) => console.error(err));
			await getAllCategories()
				.then((res) => {
					setCategories(res);
				})
				.catch((err) => console.error(err));

			await getAllSubcategories()
				.then((res) => {
					if (res && res.length) setSub(res);
				})
				.catch((err) => console.error(err));
		}
		loadData();
	}, []);

	useEffect(() => {
		if (searchText && searchText.length > 3) {
			const timeout = setTimeout(() => {
				loadFilteredProducts({ query: searchText });
			}, 500);
			return () => clearTimeout(timeout);
		}
	}, [searchText]);

	useEffect(() => {
		loadFilteredProducts(createFilter());
		// eslint-disable-next-line
	}, [filterTrigger]);

	const createFilter = () => {
		let filter;
		if (maxPrice) filter = { ...filter, price };
		if (categoryCheckList && categoryCheckList.length)
			filter = { ...filter, categories: categoryCheckList };
		if (star) filter = { ...filter, star };
		if (selectedSubcategory)
			filter = { ...filter, subcategory: selectedSubcategory };
		if (color) filter = { ...filter, color };
		if (brand) filter = { ...filter, brand };
		return filter;
	};

	const isFiltered = () => {
		return (
			searchText ||
			price ||
			(categoryCheckList && categoryCheckList.length) ||
			star ||
			selectedSubcategory ||
			color ||
			brand
		);
	};

	const triggerFilter = () => {
		dispatch({
			type: searchConstants.SEARCH_QUERY,
			payload: {
				searchText: '',
			},
		});
		setTimeout(() => {
			setFilterTrigger(!filterTrigger);
		}, 500);
	};

	const loadFilteredProducts = (fiter) => {
		setLoading(true);
		searchFilter(fiter)
			.then((res) => {
				setProducts(res);
			})
			.catch((err) => {
				console.log(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const compareProducts= (product1, product2, sortedBy, sortOrder) => {
		const data1 = product1[sortedBy];
		const data2 = product2[sortedBy];
		if (data1 < data2) {
		  return sortOrder===DISPLAY_SORT_ORDER.DESC? 1:-1
		}
		if (data1 > data2) {
		  return sortOrder===DISPLAY_SORT_ORDER.DESC? -1:1
		}
		return 0
	}
	
	const sortProduct = (products, currentPage, countPerpage) => {
		return products.sort((p1,p2)=>compareProducts(p1,p2, sortedBy, sortOrder)).filter(
			(p, index) =>
				index < currentPage * countPerpage &&
				index >= (currentPage - 1) * countPerpage
		)
	};

	const handleSliderChange = (value) => {
		setPrice(value);
		triggerFilter();
	};

	const handleSortedByChange = (value) => {
		setSortedBy(value);
	}

	const handleSortOrderChange = (value) => {
		setSortOrder(value);
	}

	return (
		<div className='container'>
			<div className='row py-4'>
				<Breadcrumb>
					<Item><Link to='/'>Home</Link></Item>
					<Item><Link to='/shop'>Shop</Link></Item>
				</Breadcrumb>
			</div>
			<div className='container-fuild mx-1'>
				<div className='row'>
					<div className='col-md-3 pt-2'>
						<h4>Filters</h4>
						<hr />
						<Menu
							className='ml-3 mr-3'
							defaultOpenKeys={['1', '2', '3', '4', '5', '6']}
							mode='inline'
						>
							<SubMenu
								key={1}
								title={
									<span className='h6'>
										<DollarOutlined /> Price
									</span>
								}
							>
								<div>
									<Slider
										className='ml-3 mr-3'
										range
										defaultValue={[0, maxPrice]}
										tipFormatter={(values) => `$ ${values}`}
										value={price}
										max={maxPrice}
										onChange={handleSliderChange}
									/>
								</div>
							</SubMenu>
							<SubMenu
								key={2}
								title={
									<span className='h6'>
										<DownSquareOutlined /> Categories
									</span>
								}
							>
								<CategoryFilter
									categories={categories}
									setCategoryCheckList={setCategoryCheckList}
									triggerFilter={triggerFilter}
								/>
							</SubMenu>
							<SubMenu
								key={3}
								title={
									<span className='h6'>
										<DownSquareOutlined /> Subcategories
									</span>
								}
							>
								<SubcategoryFilter
									categoryCheckList={categoryCheckList}
									subcategories={subcategories}
									selectedSubcategory={selectedSubcategory}
									setSelectedSubcategory={setSelectedSubcategory}
									triggerFilter={triggerFilter}
								/>
							</SubMenu>
							<SubMenu
								key={4}
								title={
									<span className='h6'>
										<StarOutlined /> Rating
									</span>
								}
							>
								<StarFilter
									star={star}
									setStar={setStar}
									triggerFilter={triggerFilter}
								/>
							</SubMenu>
							<SubMenu
								key={5}
								title={
									<span className='h6'>
										<TagsOutlined /> Brand
									</span>
								}
							>
								{productBrands && (
									<BrandFilter
										productBrands={productBrands}
										brand={brand}
										setBrand={setBrand}
										triggerFilter={triggerFilter}
									/>
								)}
							</SubMenu>
							<SubMenu
								key={6}
								title={
									<span className='h6'>
										<BorderOutlined /> Color
									</span>
								}
							>
								{productColors && (
									<ColorFilter
										productColors={productColors}
										color={color}
										setColor={setColor}
										triggerFilter={triggerFilter}
									/>
								)}
							</SubMenu>
						</Menu>
					</div>
					<div className='col-md-9 pt-2'>
						<h4 className='mb-4'>Products</h4>
						<div className='container row justify-content-end align-items-center'>
								<div className='mr-2'>Ordered by:</div>
								<Select defaultValue={ DISPLAY_SORTED_BY.SLUG} onChange={handleSortedByChange}>
									<Option value={ DISPLAY_SORTED_BY.SLUG}>
										Name
									</Option>
									<Option value={ DISPLAY_SORTED_BY.PRICE}>
										Price
									</Option>
								</Select>
								<Select defaultValue={ DISPLAY_SORT_ORDER.ACS} onChange={handleSortOrderChange}>
									<Option value={ DISPLAY_SORT_ORDER.ACS}>
										Asc
									</Option>
									<Option value={ DISPLAY_SORT_ORDER.DESC}>
										Desc
									</Option>
								</Select>
						</div>	
						{isFiltered() ? (
							<FilteredCardList
								products={sortProduct(products, currentPage, countPerpage)}
								isLoading={isLoading}
								currentPage={currentPage}
								countPerpage={countPerpage}
								productCount={products.length}
								handlePageChange={handlePageChange}
							/>
						) : (
							<ProductCardList
								sort={{[sortedBy]:sortOrder}}
								countPerpage={countPerpage}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Shop;
