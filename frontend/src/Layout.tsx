import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "./FirebaseContext";

function Header() {
  const { pathname } = useLocation(); // e.g. "/wikis/blogs/Web%20Development%20Learning%20Resources"
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((s) => decodeURIComponent(s))
    .map((s) => s.trim().replace(/ +/g, "-"));

  const path = segments.length ? `/${segments.join("/")}/` : "";

  const { isAdmin } = useAuth();

  return (
    <header box-="square" className="flex items-end justify-end p-6 shrink-0">
      <span
        is-="badge"
        variant-="background0"
        className="mr-auto lowercase tracking-tight text-[var(--background3)] font-bold italic"
      >
        ~ blue-nucleus{path}
      </span>
      <NavLink
        to="/"
        is-="badge"
        variant-="background1"
        className="ml-2 pt-2 pb-2 items-center"
      >
        Home
      </NavLink>
      <NavLink
        to="/wiki"
        is-="badge"
        variant-="background1"
        className="ml-2 pt-2 pb-2 items-center"
      >
        Wiki
      </NavLink>
      <NavLink
        to="/directory"
        is-="badge"
        variant-="background1"
        className="ml-2 pt-2 pb-2 items-center"
      >
        Directory
      </NavLink>
      <NavLink
        to="/dashboard"
        is-="badge"
        variant-="background1"
        className="ml-2 pt-2 pb-2 items-center"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/onboarding"
        is-="badge"
        variant-="background1"
        className="ml-2 pt-2 pb-2 items-center"
      >
        Onboarding
      </NavLink>

      <NavLink
        to="/admin-portal"
        is-="badge"
        variant-={isAdmin ? "yellow" : "red"}
        className={`ml-2 pt-2 pb-2 items-center ${isAdmin ? "" : "line-through"}`}
      >
        Admin Portal
      </NavLink>
    </header>
  );
}

export default function Layout() {
  return (
    <div >
      <Header />
      <Outlet />
    </div>
  );
}
