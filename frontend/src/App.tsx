import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomeRouter from "./router/HomeRouter";

const App = () => {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="/*" element={<HomeRouter />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
