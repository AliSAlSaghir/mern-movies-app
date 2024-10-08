import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import GenreList from "./pages/Admin/GenreList.jsx";
import CreateMovie from "./pages/Admin/createMovie.jsx";
import AdminMoviesList from "./pages/Admin/AdminMoviesList.jsx";
import UpdateMovie from "./pages/Admin/UpdateMovie.jsx";
import AllMovies from "./pages/Movies/AllMovies.jsx";
import MovieDetails from "./pages/Movies/MovieDetails.jsx";
import AllReviews from "./pages/Admin/AllReviews.jsx";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies" element={<AllMovies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/movies/genres" element={<GenreList />} />
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/movies/movies-list" element={<AdminMoviesList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
        <Route path="/admin/movies/reviews" element={<AllReviews />} />
        <Route path="/admin/movies/dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
