import React from "react";
import Sidenav from "../../components/Employer/Side-nav/SdeNav";
import { Routes, Route } from "react-router-dom";
import { NavRoutes } from "../../context/NavRoutes";
import EmployerHeaderWithNav from "../../components/Header/EmployerHeaderWithNav";
import Dashboard from "../../components/Employer/Employer/Dashboard";
import EmployerProfile from "../../components/Employer/Profile/EmployerProfile";
import EmployerEditProfile from "../../components/Employer/Profile/EmployerEditProfile";
import AllJobsEmployer from "../../components/Employer/Employer/AllJobsEmployer";


function EmployerHomePage() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidenav routes={NavRoutes} />
      </div>
      <div className="w-4/5 pl-6 pr-6">
        <div className="relative mx-auto flex items-center text-blue-gray-900 pb-10 pt-6">
          <EmployerHeaderWithNav />
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<EmployerProfile />} />
          <Route path="/edit-profile" element={<EmployerEditProfile />} />
          <Route path="/all-jobs" element={<AllJobsEmployer />} />

        </Routes>
      </div>
    </div>
  );
}

export default EmployerHomePage;
