import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import MainPage from "../pages/MainPage/MainPage";
import UserPage from "../pages/UserPage/UserPage";
import TextEditor from "../pages/TextEditor/TextEditor";
import LoginPage from "../pages/LoginPage/LoginPage";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import HistoryPage from "../pages/HistoryPage/HistoryPage";
import MessagesPage from "../pages/MessagesPage/MessagesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AnalyticsPage from "../pages/AnalyticsPage/AnalyticsPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";

const Router = (props: any) => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/home" element={<HomePage isOpenModal={props.isOpenModal} setProducts={props.setProducts} toggleModal={props.toggleModal} loadingProduct={props.loadingProduct} selectedProductData={props.selectedProductData}/>} >
        <Route path="/home/" element={<UserPage products={props.products} setProducts={props.setProducts} toggleModal={props.toggleModal} setLoadingProduct={props.setLoadingProduct} setSelectedProductData={props.setSelectedProductData}/>} />
        <Route path="/home/orders" element={<OrdersPage />} />
        <Route path="/home/messages" element={<MessagesPage />} />
        <Route path="/home/nodes" element={<TextEditor />} />
        <Route path="/home/analytics" element={<AnalyticsPage />} />
        <Route path="/home/history" element={<HistoryPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
