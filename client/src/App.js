import "./global_styles/css-reset.css";
import "./global_styles/common-styles.css";
import CardContainer from "./components/card/CardContainer";
import { useState, useEffect } from "react";
import Login from "./components/login/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import ClubRoutes from "./routes/ClubRoutes";
import DashBoardRoutes from "./routes/DashBoardRoutes";
import NavbarWrapper from "./common_components/navbar/NavbarWrapper";
import LoadingWrapper from "./common_components/loading/LoadingWrapper";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  const [auth, setAuth] = useState({});
  console.log("render");

  // useEffect(() => {}, []);

  // After auth state changes
  // useEffect(() => {}, [auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarWrapper />}>
          <Route index element={<Homepage />} />
          <Route path="clubs" element={<CardContainer />} />
          <Route path="club/*" element={<ClubRoutes />} />
        </Route>
        {/* Auth */}
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/dashboard/*" element={<DashBoardRoutes />} />
        <Route path="/protected" element={<LoadingWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
