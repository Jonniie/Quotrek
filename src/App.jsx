import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Pricing from "./pages/Pricing";
import CityList from "./components/CityList";

import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/app"
          element={
            <div>
              <AppLayout />
            </div>
          }
        >
          <Route index element={<CityList />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route
          path="/pricing"
          element={
            <div>
              <Pricing />
            </div>
          }
        />
        <Route
          path="/product"
          element={
            <div>
              <Product />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route
          path="*"
          element={
            <div>
              <PageNotFound />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
