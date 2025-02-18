import './App.css'
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Category from './components/Categories/Categories.jsx';
import Error from './components/Error/Error';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster.tsx';
import AuthContextProvider from './context/AuthContextProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContextProvider.jsx';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import WishList from './components/WishList/WishList';
import WishListContextProvider from './context/WishListContextProvider.jsx';
import Products from './components/Products/Products.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App() {

  const QC = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "/", element: <Login />, },
        { path: "/login", element: <Login />, },
        { path: "/register", element: <Register />, },
        { path: "/forgotpassword", element: <ForgotPassword />, },
        { path: "/verifycode", element: <VerifyCode />, },
        { path: "/resetpassword", element: <ResetPassword />, },
        { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute>, },
        { path: "/productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute>, },
        { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute>, },
        { path: "/wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute>, },
        { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute>, },
        { path: "/categories", element: <ProtectedRoute><Category /></ProtectedRoute>, },
        { path: "/brands", element: <ProtectedRoute><Brands /></ProtectedRoute>, },
        { path: "/allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute>, },
        { path: "/checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute>, },
        { path: "*", element: <Error />, },]
    },
  ])

  return (
    <>
      <QueryClientProvider client={QC}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <Toaster position="top-right" reverseOrder={false} />
              <RouterProvider router={router} />
            </WishListContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
