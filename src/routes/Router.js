import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component
import ForgetPassword from 'src/views/authentication/auth/ForgetPassword';
import AddProduct from 'src/views/Admin/AddProduct';
import Forget from 'src/views/authentication/auth/Forget';
import HomePage from 'src/views/Home/HomePage';
import ProductAll from 'src/views/Home/ProductAll';
import AgentAll from 'src/views/Home/AgentAll';
import AgentDetails from 'src/views/Home/AgentDetails';
import About from 'src/views/Home/About';
import ContactUs from 'src/views/Home/ContactUs';
import Vendor from 'src/views/Admin/Vendor';
import AddVendor from 'src/views/Admin/AddVendor';
import VendorDetails from 'src/views/Admin/VenderDetail';
import BuyNow from 'src/views/Customer/BuyNow';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const ItemDetails = Loadable(lazy(() => import('../views/sample-page/ItemDetails')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const CustomerList = Loadable(lazy(() => import('../views/Admin/CustomerList')));
const AgentList = Loadable(lazy(() => import('../views/Admin/AgentList')));
const TransactionList = Loadable(lazy(() => import('../views/Admin/TransactionList')));
const CouponList = Loadable(lazy(() => import('../views/Admin/CouponList')));
const ProductList = Loadable(lazy(() => import('../views/Admin/ProductList')));
const RecordingList = Loadable(lazy(() => import('../views/Admin/RecordingList')));
const OrderList = Loadable(lazy(() => import('../views/Admin/OrderList')));
const MyProfile = Loadable(lazy(() => import('../views/Admin/MyProfile')));
const Permission = Loadable(lazy(() => import('../views/Admin/Permission')));
const CustomPermission = Loadable(lazy(() => import('../views/Admin/CustomPermission')));
const ProductDetails = Loadable(lazy(() => import('../views/Admin/ProductDetails')));
const Languages = Loadable(lazy(() => import('../views/Admin/Languages')))
const AddLanguage = Loadable(lazy(() => import('../views/Admin/AddLanguage')))


const CustomerDashboard = Loadable(lazy(() => import('../views/Customer/CustomerDashboard')));
const AgentDashboard = Loadable(lazy(() => import('../views/Agent/AgentDashboard')));
const Chat = Loadable(lazy(() => import('../views/Customer/Chat')));
const OrderHistory = Loadable(lazy(() => import('../views/Customer/OrderHistory')));
const Subscription = Loadable(lazy(() => import('../views/Customer/Subscription')));
const Product = Loadable(lazy(() => import('../views/Customer/Product')));
const Callhistory = Loadable(lazy(() => import('../views/Agent/Callhistory')));
const Reports = Loadable(lazy(() => import('../views/Agent/Reports')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      {
        path: '/dashboard',
        exact: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },

      {
        path: '/icons',
        exact: true,
        element: (
          <PrivateRoute>
            <Icons />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui/typography',
        exact: true,
        element: (
          <PrivateRoute>
            <TypographyPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui/shadow',
        exact: true,
        element: (
          <PrivateRoute>
            <Shadow />
          </PrivateRoute>
        ),
      },
      //Main Admin Route
      {
        path: '/userlist',
        exact: true,
        element: (
          <PrivateRoute>
            <CustomerList />
          </PrivateRoute>
        ),
      },

      {
        path: '/languages',
        exact: true,
        element: (
          <PrivateRoute>
            <Languages />
          </PrivateRoute>
        ),
      },
      {
        path: '/addlanguage',
        exact: true,
        element: (
          <PrivateRoute>
            <AddLanguage />
          </PrivateRoute>
        ),
      },
      {
        path: '/addlanguage/:productId',
        exact: true,
        element: (
          <PrivateRoute>
            <AddLanguage />
          </PrivateRoute>
        ),
      },


      {
        path: '/custom-permissions/:userId',
        exact: true,
        element: (
          <PrivateRoute>
            <CustomPermission />
          </PrivateRoute>
        ),
      },
      {
        path: '/agentlist',
        exact: true,
        element: (
          <PrivateRoute>
            <AgentList />
          </PrivateRoute>
        ),
      },
      {
        path: '/transactionrecords',
        exact: true,
        element: (
          <PrivateRoute>
            <TransactionList />
          </PrivateRoute>
        ),
      },
      {
        path: '/permission',
        exact: true,
        element: (
          <PrivateRoute>
            <Permission />
          </PrivateRoute>
        ),
      },
      {
        path: '/vendor',
        exact: true,
        element: (
          <PrivateRoute>
            <Vendor />
          </PrivateRoute>
        ),
      },

      {
        path: '/addvendor',
        exact: true,
        element: (
          <PrivateRoute>
            <AddVendor />
          </PrivateRoute>
        ),
      },
      {
        path: '/addvendor/:vendorId',
        exact: true,
        element: (
          <PrivateRoute>
            <AddVendor />
          </PrivateRoute>
        ),
      },
      {
        path: '/venderdetails/:vendorId',
        exact: true,
        element: (
          <PrivateRoute>
            <VendorDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/discountlist',
        exact: true,
        element: (
          <PrivateRoute>
            <CouponList />
          </PrivateRoute>
        ),
      },
      {
        path: '/productlist',
        exact: true,
        element: (
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        ),
      },
      {
        path: '/recordinglist',
        exact: true,
        element: (
          <PrivateRoute>
            <RecordingList />
          </PrivateRoute>
        ),
      },
      {
        path: '/ordermangement',
        exact: true,
        element: (
          <PrivateRoute>
            <OrderList />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        exact: true,
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/orderhistory',
        exact: true,
        element: (
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        ),
      },
      {
        path: '/customerdashboard',
        exact: true,
        element: (
          <PrivateRoute>
            <CustomerDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/agentdashbaord',
        exact: true,
        element: (
          <PrivateRoute>
            <AgentDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/chat',
        exact: true,
        element: (
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        ),
      },

      {
        path: '/callhistory',
        exact: true,
        element: (
          <PrivateRoute>
            <Callhistory />
          </PrivateRoute>
        ),
      },
      {
        path: '/reports',
        exact: true,
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },
      {
        path: '/addproduct',
        exact: true,
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: '/addproduct/:productId',
        exact: true,
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },

      {
        path: '/productdetails',
        exact: true,
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/orderhistory',
        exact: true,
        element: (
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        ),
      },
      {
        path: '/product',
        exact: true,
        element: (
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        ),
      },
      {
        path: '/subscriptions',
        exact: true,
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/ItemDetails',
    exact: true,
    element: (
      // <PrivateRoute>
      <ItemDetails />
      // </PrivateRoute>
    ),
  },
  {
    path: '/',
    exact: true,
    element: (
      // <PrivateRoute>
      <HomePage />
      // </PrivateRoute>
    ),
  },
  {
    path: '/home',
    exact: true,
    element: (
      // <PrivateRoute>
      <HomePage />
      // </PrivateRoute>
    ),
  },
  {
    path: '/agent',
    exact: true,
    element: (
      // <PrivateRoute>
      <AgentAll />
      // </PrivateRoute>
    ),
  },
  {
    path: '/productpage',
    exact: true,
    element: (
      // <PrivateRoute>
      <ProductAll />
      // </PrivateRoute>
    ),
  },
  {
    path: '/agentdetails/:id',
    exact: true,
    element: (
      // <PrivateRoute>
      <AgentDetails />
      // </PrivateRoute>
    ),
  },
  {
    path: '/subscription',
    exact: true,
    element: (
      // <PrivateRoute>
      <Subscription />
      // </PrivateRoute>
    ),
  },
  {
    path: '/auth/login',
    exact: true,
    element: (
      // <PrivateRoute>
      <Login />
      // </PrivateRoute>
    ),
  },
  {
    path: '/about',
    exact: true,
    element: (
      // <PrivateRoute>
      <About />
      // </PrivateRoute>
    ),
  },

  {
    path: '/contactus',
    exact: true,
    element: (
      // <PrivateRoute>
      <ContactUs />
      // </PrivateRoute>
    ),
  },
  {
    path: '/buynow',
    exact: true,
    element: (
      // <PrivateRoute>
      <BuyNow />
      // </PrivateRoute>
    ),
  },
  {
    path: '/auth/register',
    exact: true,
    element: (
      // <PrivateRoute>
      <Register />
      // </PrivateRoute>
    ),
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/forgetpassword/:resetToken', element: <ForgetPassword /> },
      // { path: '/auth/register', element: <Register /> },
      { path: '/auth/forget', element: <Forget /> },
      // { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
