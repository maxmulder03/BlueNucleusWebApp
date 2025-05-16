import { User, typeToBadgeClass } from "../types/User";
import { getGridTemplateColumns } from "../utils/utils";

interface DirectoryListViewProps {
  users: User[];
}

function DirectoryListView({ users }: DirectoryListViewProps) {
  const numFields = Object.keys(users[0]).length;

  return (
    <div box-="round">
      <div className={`grid ${getGridTemplateColumns(numFields)} gap-2 p-2`}>
        <div>Name</div>
        <div>Email</div>
        <div>Github Account</div>
        <div className="justify-self-center">Employee Type</div>
        <div>Active</div>
      </div>

      {users.map((user, idx) => (
        <div
          key={user.fullName + idx}
          className={`grid ${getGridTemplateColumns(numFields)} gap-2 p-2`}
        >
          <div> {user.fullName} </div>
          <div is-="badge" variant-="background2" className="w-fit">
            {user.email}
          </div>
          <a href={`https://github.com/${user.githubUsername}`}>
            {user.githubUsername}
          </a>
          <div
            is-="badge"
            variant-={typeToBadgeClass[user.employeeType]}
            className="w-fit justify-self-center"
          >
            {user.employeeType}
          </div>
          <div> {user.activeEmployee} </div>
        </div>
      ))}
    </div>
  );
}

export default DirectoryListView;
