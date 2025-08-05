import "./ProfilePage.css";
import blankProfilePic from "./blank-php.png";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import { tmpUserData } from "./Directory/Directory"; // for users in directory
import { User } from "./types/User"; // for users in directory

function Profile() {
  const { email } = useParams<{ email?: string }>();
  // Find the user in tmpUserData by email
  const user = tmpUserData.find(u => u.email === email);

  if (!user) {
    return <div>User not found.</div>;
  }

  let userEmail = "No email provided";
  let userName = "No email provided";
  let gitName = "No email provided";
  let empRole = "No email provided";

  // For now, assume the profile being viewed is always the current user
  // If you later add viewing other users' profiles, update this logic accordingly
  const isOwnProfile = true;
  
  if (user) {
    userEmail = user?.email || "No email provided";
    userName = user?.fullName || "No name provided";
    gitName = user?.githubUsername || "No github provided";
    empRole = user?.employeeType || "No role provided";
  }

  return (
    <>
      <h1> User Profile Page </h1>
      <div className="SettingsGrid">
        <div>
          <div>{isOwnProfile ? "Your Profile" : "Viewing Profile of: " + userName}</div>
          <div>
          {isOwnProfile && (
            <div className='mt-4'>
              <p>Profile Picture</p>
              <img src={blankProfilePic} 
              alt="Default user profile photo in a neutral setting, no visible facial features or text, calm and simple tone" 
              width="10%"
              height="10%"
              />
              <input type="file" accept="image/*" />
            </div>
          )}
          </div>
          <div className="profile-settings">
            <div>Email: {userEmail}</div>
            <div>Name: {userName}</div>
            <div>GitHub Username: {gitName}</div>
            <div>Role: {empRole}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;