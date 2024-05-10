import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomeRouter from "./router/HomeRouter";
import UserRouter from "./router/UserRouter";

const App = () => {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="/*" element={<HomeRouter />}></Route>
          <Route path="/user/*" element={<UserRouter />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
