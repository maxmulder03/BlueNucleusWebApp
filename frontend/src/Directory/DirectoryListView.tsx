import { User, typeToBadgeClass } from "../types/User";
import { getGridTemplateColumns } from "../utils/utils";

interface DirectoryListViewProps {
  users: User[];
}

function DirectoryListView({ users }: DirectoryListViewProps) {
  const numFields = Object.keys(users[0]).length;

  console.log(getGridTemplateColumns(numFields));

  return (
    <div box-="round" className="overflow-x-auto">
      <div className={`grid ${getGridTemplateColumns(numFields)} gap-2 p-2`}>
       <div className="sticky left-0 z-20 px-2">Name</div>
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
          <div is-="badge" variant-="background2" className="w-fit overflow-hidden text-ellipsis max-w-full"
            title={user.email} >
            <span className="block truncate">{user.email}</span>
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
