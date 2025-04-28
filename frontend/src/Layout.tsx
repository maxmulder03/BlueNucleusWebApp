import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Header() {
  const { pathname } = useLocation(); // e.g. "/wikis/blogs/Web%20Development%20Learning%20Resources"
  const segments = pathname
    .split("/") // ["", "wikis", "blogs", "Web%20Development%20Learning%20Resources"]
    .filter(Boolean) // remove leading ""
    .map((s) => decodeURIComponent(s)) // turn %20 back into space
    .map((s) => s.trim().replace(/ +/g, "-")); // "Web Development..." → "Web-Development..."

  const path = segments.length ? `/${segments.join("/")}/` : "";

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
    </header>
  );
}

export default function Layout() {
  return (
    <div className="flex flex-col h-screen min-h-0 mx-auto w-[95%]">
      <Header />
      <main className="flex-1 min-h-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
