import { Route, Routes } from "react-router-dom";
import AddNewJob from "../pages/employer/AddNewJob";

const JobRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/create-job" element={<AddNewJob />} />
      </Routes>
    </div>
  );
};

export default JobRouter;
