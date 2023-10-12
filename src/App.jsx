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
  import ProductsPage from "./pages/Vendor/ProductsPage"
  import HistoryIndex from "./components/Vendor/revenue/HistoryChart/HistoryIndex";
  import EtalasePage from "./pages/Vendor/EtalasePage";
  import WithdrawalsPage from "./pages/Vendor/WithdrawalsPage";
  import ReviewsPage from "./pages/Vendor/ReviewPage";
  import SettingsPage from "./pages/Vendor/SettingsPage";
  import AddProductIndex from "./components/Vendor/products/AddProducts/AddProductIndex";
  import AddCouponsIndex from "./components/Vendor/Coupons/AddCoupons/AddCouponsIndex";
  import CouponsPage from "./pages/Vendor/CouponsPage";
  import ChatsPage from "./pages/Vendor/ChatsPage";
  import EditOrderReturnsIndex from "./components/Vendor/orderReturns/EditOrderReturns/EditOrderReturnsIndex";
import EditOrderIndex from "./components/Vendor/orders/EditOrder/EditOrderIndex";

  function App() {
    return (
      <div>
        <Routes>
            <Route index element={<PageDashboard />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />
            <Route path="/contact" element={<PageContact />} />
            <Route path="/product" element={<PageProduct />} />
          {/* Vendor Routes */}
          <Route element={<RootLayout />}>
          <Route path="/VenDashboard" element={<DashboardPage />} />
          <Route path="/VenProducts" element={<ProductsPage />} />
          <Route path="/VenOrders" element={<OrdersPage />} />
          <Route path="/VenOrderReturns" element={<OrderReturnsPage />} />
          <Route path="/VenRevenue" element={<RevenuePage />} />
          <Route path="/VenEtalase" element={<EtalasePage />} />
          <Route path="/VenWithdrawals" element={<WithdrawalsPage />} />
          <Route path="/VenReviews" element={<ReviewsPage />} />
          <Route path="/VenSettings" element={<SettingsPage />} />
          <Route path="/VenCreateProduct" element={<AddProductIndex />} />
          <Route path="/VenCreateCoupons" element={<AddCouponsIndex />} />
          <Route path="/historyRevenue" element={<HistoryIndex/>}/>
          <Route path="/venCoupons" element={<CouponsPage/>}/>
          <Route path="/venChats" element={<ChatsPage/>}/>
          <Route path="/VenOrderReturns/edit/:id" Component={EditOrderReturnsIndex} />
          <Route path="/VenOrder/edit/:id" Component={EditOrderIndex} />
          </Route>
          </Routes>
      </div>
    );
  }

  export default App;
