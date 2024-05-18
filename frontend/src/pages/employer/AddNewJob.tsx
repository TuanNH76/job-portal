import PostJob from "../../components/Employer/Jobs/PostJob";
import React from 'react'
import EmployerHeader from "../../components/Header/EmployerHeader";

function AddNewJob() {
  return (
    <div className="bg-purple-200">
      <EmployerHeader />
      <PostJob />
    </div>
  );
}

export default AddNewJob;
