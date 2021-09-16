import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { userConstants } from './redux/constants';
import { auth } from './helpers/firebase';
import * as requests from './helpers/requests/auth';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingOutlined } from '@ant-design/icons';
import './App.css';

const UserRoute = lazy(() => import('./route/auth/UserRoute'));
const AdminRoute = lazy(() => import('./route/auth/AdminRoute'));
const Header = lazy(() => import('./components/nav/Header'));
const Footer = lazy(() => import('./components/Footer'));
const CartDrawer = lazy(() => import('./components/drawer/CartDrawer'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const HomePage = lazy(() => import('./pages/HomePage'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const ProductView = lazy(() => import('./pages/product/ProductView'));
const UserAccount = lazy(() => import('./pages/user/UserAccount'));
const OrderHistory = lazy(() => import('./pages/user/OrderHistory'));
const Password = lazy(() => import('./pages/user/Password'));
const WishList = lazy(() => import('./pages/user/WishList'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() =>
	import('./pages/admin/category/CategoryCreate')
);
const CategoryUpdate = lazy(() =>
	import('./pages/admin/category/CategoryUpdate')
);
const SubcategoryUpdate = lazy(() =>
	import('./pages/admin/subcategory/SubcategoryUpdate')
);
const SubcategoryCreate = lazy(() =>
	import('./pages/admin/subcategory/SubcategoryCreate')
);
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const ProductsDisplay = lazy(() =>
	import('./pages/admin/product/ProductsDisplay')
);
const ProductEdit = lazy(() => import('./pages/admin/product/ProductEdit'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubcategoryHome = lazy(() =>
	import('./pages/subcategory/SubcategoryHome')
);
const Coupon = lazy(() => import('./pages/admin/coupon/Coupon'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));

const App = () => {
	const dispatch = useDispatch();

	const onAuthStateChanged = async () => {
		return await auth.onAuthStateChanged(async (user) => {
			const signInEmail = window.localStorage.getItem('signInEmail');
			if (user && signInEmail === null) {
				const { token } = await user.getIdTokenResult();
				await requests
					.getCurrentUser(token)
					.then((res) => {
						dispatch({
							type: userConstants.LOGGED_IN_USER,
							payload: {
								token,
								...res,
							},
						});
					})
					.catch((err) => {
						toast.error('failed to get current user! Error:' + err.message);
					});
			}
		});
	};
	useEffect(() => {
		const unsubscribe = onAuthStateChanged();
		//clean up
		return () => {
			// console.log('unsubscribe()', unsubscribe);
			return unsubscribe();
		};
		// eslint-disable-next-line
	}, []); //dispatch

	return (
		<Suspense
			fallback={
				<div className='col text-center mt-5 p-5'>
					Welcome to ANK ECOMMERCE
					<LoadingOutlined />
				</div>
			}
		>
			<Header />
			<CartDrawer />
				<main>
					<Switch>
						<Route exact path='/' component={HomePage} />
						<Route path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<Route
							exact
							path='/register/complete'
							component={RegisterComplete}
						/>
						<Route
							exact
							path='/account/reset-password'
							component={ResetPassword}
						/>

						<Route exact path='/product/:slug' component={ProductView} />
						<Route exact path='/category/:slug' component={CategoryHome} />
						<Route
							exact
							path='/subcategory/:slug'
							component={SubcategoryHome}
						/>
						<Route exact path='/shop/' component={Shop} />
						<Route exact path='/shop/:query' component={Shop} />
						<Route exact path='/cart/' component={Cart} />

						<UserRoute exact path='/checkout/' component={Checkout} />
						<UserRoute exact path='/payment/' component={Payment} />
						<UserRoute exact path='/user/account' component={UserAccount} />
						<UserRoute
							exact
							path='/user/order-history'
							component={OrderHistory}
						/>
						<UserRoute exact path='/user/password' component={Password} />
						<UserRoute exact path='/user/wishlist' component={WishList} />

						<AdminRoute
							exact
							path='/admin/dashboard'
							component={AdminDashboard}
						/>
						<AdminRoute
							exact
							path='/admin/category'
							component={CategoryCreate}
						/>
						<AdminRoute exact path='/admin/coupon' component={Coupon} />
						<AdminRoute
							exact
							path='/admin/category/:slug'
							component={CategoryUpdate}
						/>
						<AdminRoute
							exact
							path='/admin/subcategory'
							component={SubcategoryCreate}
						/>
						<AdminRoute
							exact
							path='/admin/subcategory/:slug'
							component={SubcategoryUpdate}
						/>
						<AdminRoute exact path='/admin/product' component={ProductCreate} />
						<AdminRoute
							exact
							path='/admin/products'
							component={ProductsDisplay}
						/>
						<AdminRoute
							exact
							path='/admin/product/:slug'
							component={ProductEdit}
						/>

						<Route component={PageNotFound} />
						{/* <Route
						exact
						path='/admin/account'
						render={RouteProtector(AdminDashboard, user, USER_ROLES.ADMIN)}
					/> */}
						{/* <Route
						exact
						path='/user/account'
						render={RouteProtector(UserAccount, user)}
					/> */}
					</Switch>
				</main>
			<Footer />
			<ToastContainer autoClose={3000} hideProgressBar />
		</Suspense>
	);
};

export default App;
