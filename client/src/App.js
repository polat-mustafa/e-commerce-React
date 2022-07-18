import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Order from "./components/Admin/Order";
import Product from "./components/Admin/Product";

import { ReactQueryDevtools } from "react-query/devtools";
import Basket from "./components/Basket";

import { useAdmin } from "./context/AuthAdmin";
import AdminPanel from "./pages/AdminPanel";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateProduct from "./components/Admin/UpdateProduct";
import CreateProduct from "./components/Admin/CreateProduct";

function App() {
  const { authAdmin } = useAdmin();
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/product" element={<Home />} />
          <Route path="/product/:_id" exact element={<ProductDetail />} />
          <Route path="/basket" element={<Basket />} />
          <Route
            path="/admin"
            element={
              isAuthenticated && user.email === authAdmin ? (
                <AdminPanel />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/product"
            element={
              isAuthenticated && user.email === authAdmin ? (
                <Product />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/order"
            element={
              isAuthenticated && user.email === authAdmin ? (
                <Order />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              isAuthenticated && user.email === authAdmin ? (
                <UpdateProduct />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin/create"
            element={
              isAuthenticated && user.email === authAdmin ? (
                <CreateProduct />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        <ReactQueryDevtools />
      </BrowserRouter>
    </div>
  );
}

export default App;
