import UserDashboardComponent from "../components/UserDashboardComponent";
import Footer from "../components/Footer";
import FrameComponent4 from "../components/FrameComponent4";
import "./OwnerDashboard.css";

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <FrameComponent4 />
      <div className="parent">
        <header className="dashboard-wrapper">
          <h3 className="dashboard1">User Dashboard</h3>
        </header>
        <section className="dashboard-inner">
          <UserDashboardComponent />
        </section>
      </div>
      <div className="dashboard-footer">
        <Footer propHeight="20.9px" propHeight1="24px" />
      </div>
    </div>
  );
};

export default UserDashboard;