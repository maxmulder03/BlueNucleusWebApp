import { useEffect, useState } from "react";
import { User, typeToBadgeClass } from "../types/User";

interface DirectoryCardViewProps {
  users: User[];
}

function DirectoryCardView({ users }: DirectoryCardViewProps) {
  //TODO: Need to create a server such that it stores pictures for each user
  return (
    <div className="grid grid-cols-12 grid-rows-4 h-full pt-4">
      {users.map((user, idx) => (
        <div
          box-="round contain:none"
          className={`col-start-${idx * 4 + 1} col-span-4 h-full`}
          key={user.fullName}
        >
          <div className="flex flex-row justify-between">
            <span
              is-="badge"
              variant-="background0"
              className="align-start pl-2"
            >
              {user.fullName}
            </span>
            <span is-="badge" variant-="background2" className="align-end mr-2">
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
  );
}

export default DirectoryCardView;
