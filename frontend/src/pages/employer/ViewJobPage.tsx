import EmployerViewJob from "../../components/Employer/Jobs/ViewJob";
import EmployerHeader from "../../components/Header/EmployerHeader";

function ViewJobPage() {
  return (
    <div className="bg-purple-200">
      <EmployerHeader />
      <EmployerViewJob />
    </div>
  );
}

export default ViewJobPage;
