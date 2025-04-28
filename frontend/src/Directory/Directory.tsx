import { useEffect, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  githubUsername: string;
  employeeType: EmployeeType;
  activeEmployee: boolean;
}

type EmployeeType = "Undergraduate" | "Graduate" | "Admin";

const typeToBadgeClass: Record<EmployeeType, string> = {
  Undergraduate: "blue",
  Graduate: "flamingo",
  Admin: "yellow",
};

function Directory() {
  const [users, setUsers] = useState([]);
  const tmpUserData: User[] = [
    {
      firstName: "Max",
      lastName: "Mulder",
      email: "maxmulder03@gmail.com",
      githubUsername: "maxmulder03",
      employeeType: "Admin",
      activeEmployee: true,
    },
    {
      firstName: "Jonathan",
      lastName: "Englesma",
      email: "engeljo@gvsu.edu",
      githubUsername: "jenglesma",
      employeeType: "Admin",
      activeEmployee: true,
    },
    {
      firstName: "Rahat",
      lastName: "Ibn Rafiq",
      email: "rafiqr@gvsu.edu",
      githubUsername: "RahatIbnRafiq",
      employeeType: "Admin",
      activeEmployee: true,
    },
    {
      firstName: "Tara",
      lastName: "Barnett",
      email: "barntara@mail.gvsu.edu",
      githubUsername: "",
      employeeType: "Undergraduate",
      activeEmployee: true,
    },
    {
      firstName: "Matthew",
      lastName: "Smith",
      email: "mattsmith1652@gmail.com",
      githubUsername: "Smittyxc",
      employeeType: "Undergraduate",
      activeEmployee: true,
    },
    {
      firstName: "Zachary",
      lastName: "Williams",
      email: "williazs@gmail.com",
      githubUsername: "williazs",
      employeeType: "Undergraduate",
      activeEmployee: true,
    },
    {
      firstName: "Patrick",
      lastName: "Waga Odongo",
      email: "wagaodongo@gmail.com",
      githubUsername: "OdongoWaga",
      employeeType: "Graduate",
      activeEmployee: true,
    },
    {
      firstName: "Hoan",
      lastName: "Lam",
      email: "lamho@mail.gvsu.edu",
      githubUsername: "HoanLam",
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
    console.log("Copying emails");
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

      <div box-="round contain:!top" className="">
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
            onClick={copyEmails}
          >
            Filter on...
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 grid-rows-4 h-full pt-4">
        {tmpUserData.map((user, idx) => (
          <div
            box-="round contain:none"
            className={`col-start-${idx * 4 + 1} col-span-4 h-full`}
            key={user.firstName + user.lastName}
          >
            <div className="flex flex-row justify-between">
              <span
                is-="badge"
                variant-="background0"
                className="align-start pl-2"
              >
                {" "}
                {user.firstName + " " + user.lastName + " "}
              </span>
              <span
                is-="badge"
                variant-="background2"
                className="align-end mr-2"
              >
                {user.email}
              </span>
            </div>

            <div className="grid grid-cols-3 h-full items-center justify-items-center translate-y-[-18px]">
              <div className="col-start-1 col-span-1 h-[60%] w-[65%] bg-gray-700 rounded-sm"></div>
              <div className="grid grid-col-1 gap-1 col-start-2 col-span-2 p-4">
                <div>
                  {" "}
                  <span className="text-[var(--background3)]">github: </span>
                  <a
                    href={`https://github.com/${user.githubUsername}`}
                    className="hover:text-[var(--foreground2)] hover:underline"
                  >
                    {user.githubUsername}
                  </a>
                </div>
                <div>
                  {" "}
                  <div className="inline text-[var(--background3)]">
                    email:{"   "}
                  </div>
                  {user.email}
                </div>
                <div>
                  {" "}
                  <div className="inline text-[var(--background3)]">
                    current projects:{"   "}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--background3)]">status: </span>
                  {user.activeEmployee ? "Active" : "Inactive"}
                </div>

                <div
                  is-="badge"
                  variant-={typeToBadgeClass[user.employeeType]}
                  className="w-fit"
                >
                  {" "}
                  {user.employeeType}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Directory;
