import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import PageDashboard from "./pages/PageDashboard";

import PageAbout from "./pages/PageAbout";
import PageLogin from "./pages/PageLogin";
import PageRegister from "./pages/PageRegister";
import PageContact from "./pages/PageContact";
import PageProduct from "./pages/PageProducts";
import RootLayout from "./components/Vendor/Layouts/RootLayout";
import DashboardPage from "./pages/Vendor/DashboardPage";
import OrdersPage from "./pages/Vendor/OrderPage";
import OrderReturnsPage from "./pages/Vendor/OrderReturnsPage";
import RevenuePage from "./pages/Vendor/RevenuePage";
import ProductsPage from "./pages/Vendor/ProductsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<PageDashboard />} />
          <Route path="/about" element={<PageAbout />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/register" element={<PageRegister />} />
          <Route path="/contact" element={<PageContact />} />
          <Route path="/product" element={<PageProduct />} />
        </Route>
        {/* Vendor Routes */}
        <Route element={<RootLayout />}>
          <Route path="/venDashboard" element={<DashboardPage />} />
          <Route path="/VenOrders" element={<OrdersPage />} />
          <Route path="/VenProducts" element={<ProductsPage />} />
          <Route path="/VenOrderReturns" element={<OrderReturnsPage />} />
          <Route path="/VenRevenue" element={<RevenuePage />} />
        </Route>
      </Routes>
    </div>
  );
}

function MainLayout() {
  return (
    <div>
      {/* Put your main layout components here */}
      <Outlet />
    </div>
  );
}

export default App;
