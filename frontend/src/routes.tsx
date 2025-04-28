import Home from "./Home";
import CreateAccountWrapper from "./CreateAccountWrapper";
import SignIn from "./SignIn";
import OnboardingList from "./OnboardingList";
import OnboardingPage from "./OnboardingPage";
import EmployeeDashboard from "./EmployeeDashboard";
import Wiki from "./Wiki";
import Directory from "./Directory/Directory";
import WikiArticlePage from "./WikiArticlePage";
import Layout from "./Layout";

export const routes = [
  {
    element: <Layout />, // header lives here
    children: [
      { index: true, element: <Home /> },
      { path: "onboarding", element: <OnboardingPage /> },
      { path: "create-account", element: <CreateAccountWrapper /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "wiki", element: <Wiki /> },
      { path: "directory", element: <Directory /> },
      { path: "dashboard", element: <EmployeeDashboard /> },
      {
        path: "wikis/:wikiType/:wikiArticleName",
        element: <WikiArticlePage />,
      },
    ],
  },
];
