import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminSideBar from '../../../components/nav/AdminSideBar';
import ProductForm from '../../../components/form/ProductForm';
import ImgUpload from '../../../components/form/ImgUpload';
import * as productRequest from '../../../helpers/requests/product';
import * as categoryRequest from '../../../helpers/requests/category';
import * as subcategoryRequest from '../../../helpers/requests/subcategory';
import { PRODUCT_COLORS, PRODUCT_BRANDS } from '../../../constants';

const initProduct = {
	title: '',
	description: '',
	price: '',
	category: '',
	subcategory: [],
	shipping: '',
	quantity: 0,
	images: [],
	color: '',
	brand: '',
};

function ProductCreate({ history }) {
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

	const user = useSelector((state) => state.user);
	const [isLoading, setLoading] = useState(false);
	const [product, setProduct] = useState(initProduct);
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const productColors = initColors(PRODUCT_COLORS);
	const productBrands = initBrands(PRODUCT_BRANDS);

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = async () => {
		await categoryRequest
			.getAllCategories()
			.then((data) => setCategories(data))
			.catch((err) => toast.error(err));
	};

	const loadSubcategoriesByCategory = async (categoryId) => {
		await subcategoryRequest
			.getSubcategoriesByCategory(categoryId)
			.then((data) => {
				setSubcategories(data);
			})
			.catch((err) => toast.error(err));
	};

	// const formValidations = () => {};

	const handleSubmit = async (e) => {
		e.preventDefault();
		//form validation
		if (user && user.token) {
			setLoading(true);
			await productRequest
				.createProduct(user.token, product)
				.then((res) => {
					toast.success(`Product "${res.title}" has been created`);
					setProduct({ ...product, ...initProduct });
					window.location.reload();
				})
				.catch((err) => {
					toast.error(JSON.stringify(err.message));
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handleCategoryChange = (e) => {
		const { name, value: categoryId } = e.target;
		setProduct({ ...product, [name]: categoryId, subcategory: [] });
		if (categoryId) loadSubcategoriesByCategory(categoryId);
		else setSubcategories([]);
	};

	const handleSubcategoryChange = (value) => {
		setProduct({ ...product, subcategory: value });
	};

	return (
		<div className='container-fluid mt-3'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminSideBar />
				</div>
				<div className='col-md-10'>
					{isLoading ? (
						<h4 className='text-danger'>Loading...</h4>
					) : (
						<h4>Create product</h4>
					)}
					<div className='p-3'>
						<ImgUpload
							setLoading={setLoading}
							product={product}
							setProduct={setProduct}
						/>
					</div>
					<ProductForm
						product={product}
						productColors={productColors}
						productBrands={productBrands}
						categories={categories}
						subcategories={subcategories}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						handleCategoryChange={handleCategoryChange}
						handleSubcategoryChange={handleSubcategoryChange}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}

export default ProductCreate;
