import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Pricing from "./pages/Pricing";
import CityList from "./components/CityList";

import Login from "./pages/Login";
import { CitiesProvider } from "./contexts/CitiesContext";
import CountryList from "./components/CountryList";
import City from "./components/City";

function App() {
  return (
    <CitiesProvider>
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
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="cities/:id" element={<City />} />
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
    </CitiesProvider>
  );
}

export default App;
