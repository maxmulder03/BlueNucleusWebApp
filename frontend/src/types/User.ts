export interface User {
  fullName: string;
  email: string;
  githubUsername: string;
  employeeType: EmployeeType;
  activeEmployee: boolean;
}

export type EmployeeType = "Undergraduate" | "Graduate" | "Admin";

export const typeToBadgeClass: Record<EmployeeType, string> = {
  Undergraduate: "blue",
  Graduate: "flamingo",
  Admin: "yellow",
};
