import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";

import Login from "./pages/Login";
import { CitiesProvider } from "./contexts/CitiesContext";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isLoaded) {
        if (!isSignedIn) navigate("/");
      }
    },
    [children, isLoaded, isSignedIn, navigate]
  );

  return isSignedIn ? children : null;
}

function App() {
  return (
    <CitiesProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/app"
          element={
            <div>
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            </div>
          }
        >
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="form" element={<Form />} />
        </Route>

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
