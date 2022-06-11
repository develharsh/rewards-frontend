import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/user";
// import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import Vouchers from "./pages/Vouchers";
import Login from "./pages/Login";

function App() {
  // const { loading, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/vouchers" element={<Vouchers />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
