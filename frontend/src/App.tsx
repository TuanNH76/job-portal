import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomeRouter from "./router/HomeRouter";
import UserRouter from "./router/UserRouter";
import EmployerRouter from "./router/EmployerRouter";
import JobRouter from "./router/JobRouter";


const App = () => {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="/*" element={<HomeRouter />}></Route>
          <Route path="/user/*" element={<UserRouter />} />
          <Route path="/employer/*" element={<EmployerRouter />} />
          <Route path="/job/*" element={<JobRouter />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
