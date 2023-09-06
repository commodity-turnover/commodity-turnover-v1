import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import MainPage from "../pages/MainPage/MainPage";
import Products from "../components/UI/Products/Products";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/home" element={<HomePage />} >
        {/* <Route path="/home/products" element={<Products />} /> */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
