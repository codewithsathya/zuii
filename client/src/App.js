import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Requests from "./pages/Requests";
import Book from "./pages/Book";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import Track from "./pages/Track";
import MasterMap from "./pages/MasterMap";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("profile"));
    if (userData) {
      dispatch(
        authActions.authenticate({ data: userData, token: userData.token })
      );
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="requests" element={<Requests />} />
        <Route path="track/:orderId" element={<Track />} />
        <Route path="/book" element={<Book />} />
        <Route path="/mastermap" element={<MasterMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
