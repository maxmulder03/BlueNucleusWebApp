import { User, typeToBadgeClass } from "../types/User";

interface DirectoryListViewProps {
  users: User[];
}

function DirectoryListView({ users }: DirectoryListViewProps) {
  return (
    <div box-="round" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-fixed">
          <thead>
            <tr className="whitespace-nowrap">
              <th className="sticky left-0 z-30 w-48 text-left p-2 border-b font-semibold bg-[var(--background2)]">
                Name
              </th>
              <th className="w-64 text-left p-2 border-b font-semibold">
                Email
              </th>
              <th className="w-40 text-left p-2 border-b font-semibold">
                Github Account
              </th>
              <th className="w-36 text-center p-2 border-b font-semibold">
                Employee Type
              </th>
              <th className="w-24 text-center p-2 border-b font-semibold">
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.fullName + idx}
                className="whitespace-nowrap"
              >
                <td className="sticky left-0 z-20 p-2 border-b bg-[var(--background2)]">
                  <div className="truncate pr-2" title={user.fullName}>
                    {user.fullName}
                  </div>
                </td>
                <td className="p-2 border-b">
                  <div
                    is-="badge"
                    variant-="background2"
                    className="inline-block max-w-full"
                    title={user.email}
                  >
                    <span className="truncate block">{user.email}</span>
                  </div>
                </td>
                <td className="p-2 border-b">
                  <a
                    href={`https://github.com/${user.githubUsername}`}
                    className="block truncate hover:underline text-blue-600"
                    title={user.githubUsername}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.githubUsername}
                  </a>
                </td>
                <td className="p-2 border-b text-center">
                  <div
                    is-="badge"
                    variant-={typeToBadgeClass[user.employeeType]}
                    className="inline-block whitespace-nowrap"
                  >
                    {user.employeeType}
                  </div>
                </td>
                <td className="p-2 border-b text-center">
                  {user.activeEmployee ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DirectoryListView;
