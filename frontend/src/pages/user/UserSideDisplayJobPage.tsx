import UserHeader from "../../components/Header/UserHeader";
import UserSideFooter from "../../components/Footer/UserSideFooter";
import DisplayJobs from "../../components/User/Jobs/DisplayJobs";

function DisplayJobPage() {
  return (
    <>
      <UserHeader />
      <DisplayJobs />
      <UserSideFooter />
    </>
  );
}

export default DisplayJobPage;
