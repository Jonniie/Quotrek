import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";

import { CitiesProvider } from "./contexts/CitiesContext";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { SignIn, SignUp } from "@clerk/clerk-react";

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";

function ProtectedRoute({ children }) {
  const { isLoaded } = useAuth();
  return (
    isLoaded && (
      <>
        <SignedIn>{children}</SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    )
  );
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

        <Route path="/sign-in" element={<SignIn redirectUrl="/app" />} />
        <Route path="/sign-up" element={<SignUp redirectUrl="/app" />} />
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
