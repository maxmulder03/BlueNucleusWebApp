import Home from "./Home";
import CreateAccountWrapper from "./CreateAccountWrapper";
import SignIn from "./SignIn";
import OnboardingList from "./OnboardingList";
import EmployeeDashboard from "./EmployeeDashboard";
import Wiki from "./Wiki";
import Directory from "./Directory/Directory";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WikiArticlePage from "./WikiArticlePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <div className="mx-auto my-2 w-[95%]">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header
            box-="square "
            className="flex items-end justify-end p-6 mt-6"
          >
            <h1 className="self-start mr-auto"> Blue Nucleus </h1>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<OnboardingList />} />
            <Route path="/create-account" element={<CreateAccountWrapper />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            <Route
              path="/wikis/:wikiType/:wikiArticleName"
              element={<WikiArticlePage />}
            />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
