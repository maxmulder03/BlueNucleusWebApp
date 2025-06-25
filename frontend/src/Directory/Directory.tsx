import { useEffect, useState } from "react";
import DirectoryCardView from "./DirectoryCardView";
import DirectoryListView from "./DirectoryListView";
import { User } from "../types/User";

function Directory() {
  const [users, setUsers] = useState([]);
  const [listView, setListView] = useState(false);

  const tmpUserData: User[] = [
    {
      fullName: "Max Mulder",
      email: "maxmulder03@gmail.com",
      githubUsername: "maxmulder03",
      employeeType: "Admin",
      activeEmployee: true,
    },
    {
      fullName: "Jonathan Englesma",
      email: "engeljo@gvsu.edu",
      githubUsername: "jengelsma",
      employeeType: "Admin",
      activeEmployee: true,
    },
    {
      fullName: "Rahat Ibn Rafiq",
      email: "rafiqr@gvsu.edu",
      githubUsername: "RahatIbnRafiq",
      employeeType: "Admin",
      activeEmployee: true,
    },
    {
      fullName: "Hans Dulimarta",
      email: "dulimarh@gvsu.edu",
      githubUsername: "",
      employeeType: "Admin",
      activeEmployee: true,
    },
    {
      fullName: "Tara Barnett",
      email: "barntara@mail.gvsu.edu",
      githubUsername: "",
      employeeType: "Undergraduate",
      activeEmployee: true,
    },
    {
      fullName: "Matthew Smith",
      email: "mattsmith1652@gmail.com",
      githubUsername: "Smittyxc",
      employeeType: "Undergraduate",
      activeEmployee: true,
    },
    {
      fullName: "Zachary Williams",
      email: "williazs@mail.gvsu.edu",
      githubUsername: "williazs",
      employeeType: "Undergraduate",
      activeEmployee: true,
    },
    {
      fullName: "Patrick Waga Odongo",
      email: "wagaodongo@gmail.com",
      githubUsername: "OdongoWaga",
      employeeType: "Graduate",
      activeEmployee: true,
    },
    {
      fullName: "Hoan Lam",
      email: "lamho@mail.gvsu.edu",
      githubUsername: "HoanLam",
      employeeType: "Graduate",
      activeEmployee: true,
    },
    {
      fullName: "Collin Brennan",
      email: "brenncol@mail.gvsu.edu",
      githubUsername: "",
      employeeType: "Undergraduate",
      activeEmployee: true,
    },
    {
      fullName: "Muttaki Bismoy",
      email: "bismoym@mail.gvsu.edu",
      githubUsername: "",
      employeeType: "Graduate",
      activeEmployee: true,
    },
    {
      fullName: "Lucy Roop",
      email: "rooplu@mail.gvsu.edu",
      githubUsername: "",
      employeeType: "Undergraduate",
      activeEmployee: true,
    },
    {
      fullName: "Malek Garrach",
      email: "garrach@gvsu.edu",
      githubUsername: "",
      employeeType: "Graduate",
      activeEmployee: true,
    },
    {
      fullName: "Nathan Katzman",
      email: "katzmann@mail.gvsu.edu",
      githubUsername: "Katzmann835",
      employeeType: "Graduate",
      activeEmployee: true,
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/getUsers",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUsers();
  }, []);

  const copyEmails = async () => {
    let emails = "";
    tmpUserData.forEach((user) => {
      emails += user.email + ", ";
    });
    try {
      await navigator.clipboard.writeText(emails);
    } catch (err) {
      console.error("Could not copy e-mail", err);
    }
    return;
  };

  return (
    <>
      <h1 className="pb-3">Directory</h1>

      <div box-="round" shear-="top" className="">
        <div is-="badge" variant-="background0">
          Actions
        </div>

        <div>
          <button className="ml-3 mt-2 mb-2 h-[80%]" onClick={copyEmails}>
            Copy All Emails
          </button>

          <button
            variant-="background2"
            className="ml-3 mt-2 mb-2 h-[80%]"
            onClick={() => setListView(!listView)}
          >
            {listView ? "Toggle Card View" : "Toggle List View"}
          </button>
        </div>
      </div>

      {listView ? (
        <DirectoryListView users={tmpUserData} />
      ) : (
        <DirectoryCardView users={tmpUserData} />
      )}
    </>
  );
}

export default Directory;
