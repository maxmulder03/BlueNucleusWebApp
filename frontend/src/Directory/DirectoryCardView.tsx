import { User, typeToBadgeClass } from "../types/User";

interface DirectoryCardViewProps {
  users: User[];
}

function DirectoryCardView({ users }: DirectoryCardViewProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    
    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='12'%3EUser%3C/text%3E%3C/svg%3E";
  };

  return (
    <div box-="round" className="p-4">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {users.map((user) => (
          <div
            key={user.fullName}
            box-="round contain:none"
            className="bg-inherit p-4 rounded shadow flex flex-col items-start h-full"
          >
            
            <div className="w-full mb-3">
              <span
                is-="badge"
                variant-="background0"
                className="truncate max-w-full"
                title={user.fullName}
              >
                {user.fullName}
              </span>
            </div>

            
            <div className="flex flex-row w-full gap-3">
              
              <div className="flex-shrink-0">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={`${user.fullName} profile`}
                    className="h-16 w-16 object-cover rounded-sm bg-gray-200"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 rounded-sm flex items-center justify-center">
                    <span className="text-gray-500 text-xs">User</span>
                  </div>
                )}
              </div>

              
              <div className="flex flex-col gap-1 flex-grow min-w-0">
                <div className="truncate" title={user.githubUsername}>
                  <span className="text-[var(--background3)] text-sm">
                    github:{" "}
                  </span>
                  <a
                    href={`https://github.com/${user.githubUsername}`}
                    className="hover:text-[var(--foreground2)] hover:underline text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.githubUsername}
                  </a>
                </div>

                <div className="text-sm">
                  <span className="text-[var(--background3)]">status: </span>
                  {user.activeEmployee ? "Active" : "Inactive"}
                </div>

                
                <div className="text-sm truncate" title={user.email}>
                  <span className="text-[var(--background3)]">email: </span>
                  {user.email}
                </div>

                <div
                  is-="badge"
                  variant-={typeToBadgeClass[user.employeeType]}
                  className="w-fit text-xs"
                >
                  {user.employeeType}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DirectoryCardView;
