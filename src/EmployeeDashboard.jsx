import './EmployeeDashboard.css';
import { auth, db } from "./FirebaseApp";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

function DashboardItem({ title, text }) {
  return (
    <div>
      <h2> {title} </h2>
      <div className="grid-item">
        <p> {text != null ? text.firstName : "loading"} </p>
        <p> {text != null ? text.lastName : "loading"} </p>
        <p> {text != null ? text.email : "loading"} </p>
        <p> {text != null ? text.github : "loading"} </p>
      </div>
    </div>
  );
}

function EmployeeDashboard() {

  const [profileInfo, setProfileInfo] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfileInfo = async () => {
      if (!user) return;
      try {
        console.log("User:", user);
        console.log("Hello:", user.email);
        const userEmail = user.email;
        const userInfoRef = collection(db, "userInfo");
        const q = query(userInfoRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc => ({ id: doc.id, ...doc.data() })));
        setProfileInfo(data[0]);
        console.log(data[0]);
      } catch (e) {
        console.error("Error Fetching user info:", e);
        setProfileInfo("Error Fetching UserInfo");
      }
    };
    fetchProfileInfo();
  }, [user]);

  return (
    <div className="dashboard-container">
      <h1 className="">Dashboard</h1>
      <div className="dashboard-grid">
        <DashboardItem title="Profile" text={profileInfo} />
        <DashboardItem title="Action Items" />
        <DashboardItem title="Important Dates" />
        <DashboardItem title="Tools" />
        <DashboardItem title="Other" />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
