import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
//components
import Header from './components/Header';
import Footer from './components/Footer';
// pages
import Home from './pages/Home';
import Products from './pages/Products';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import { ToastContainer } from 'react-toastify';


const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products/:id', element: <Products /> },
      { path: '/product/:id', element: <ProductDetails /> },
      { path: '/search', element: <Search /> },
    ]
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
