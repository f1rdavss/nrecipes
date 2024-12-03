import React, { lazy } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import RecipePage from "./pages/RecipePage";
import BasketPage from "./pages/BasketPage";
// import NotFoundPage from "./pages/NotFoundPage";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/categories" element={<CategoriesPage />}></Route>
        <Route path="/basket" element={<BasketPage />}></Route>
        <Route path="/recipe/:id" element={<RecipePage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
