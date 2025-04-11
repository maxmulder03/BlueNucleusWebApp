import "./fonts.css";
import "./App.css";
import Home from "./Home.jsx";
import CreateAccountWrapper from "./CreateAccountWrapper.jsx";
import SignIn from "./SignIn.jsx";
import OnboardingList from "./OnboardingList.jsx";
import EmployeeDashboard from "./EmployeeDashboard.jsx";
import Wiki from "./Wiki.tsx";
import Directory from "./Directory/Directory.jsx";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WikiArticlePage from "./WikiArticlePage.jsx";

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
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header className="app-header-container">
            <NavLink to="/" className="app-header-link">
              HOME
            </NavLink>
            <NavLink to="/wiki" className="app-header-link">
              WIKI
            </NavLink>
            <NavLink to="/directory" className="app-header-link">
              DIRECTORY
            </NavLink>
            <NavLink to="/dashboard" className="app-header-link">
              DASHBOARD
            </NavLink>
            <NavLink to="/onboarding" className="app-header-link">
              ONBOARDING
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
    </>
  );
}

export default App;
