import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const Booking = lazy(() => import("./components/Booking"));
const Book = lazy(() => import("./components/Book"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoadingProvider>
              <Suspense>
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              </Suspense>
            </LoadingProvider>
          }
        />
        <Route
          path="/booking"
          element={
            <Suspense>
              <Booking />
            </Suspense>
          }
        />
        <Route
          path="/book"
          element={
            <Suspense>
              <Book />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
