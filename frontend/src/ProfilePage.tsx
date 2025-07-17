import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "./FirebaseContext";
import "./ProfilePage.css";

function Profile() {
  const { email, githubUsername,  } = useParams(); /* for users in directory*/
  const { user } = useAuth(); // for logged-in user

  const userEmail = email || user?.email || "No email provided";
  const userName = null;
  const gitName = githubUsername || null;
  const empRole = null;

  const isOwnProfile = email === user?.email;

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
              <img src="./blank-php.png" 
              alt="Default user profile photo in a neutral setting, no visible facial features or text, calm and simple tone" 
              width="15%"
              height="15%"
              />
              <input type="file" accept="image/*" />
            </div>
          )}
          </div>
          <div class="profile-settings">
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