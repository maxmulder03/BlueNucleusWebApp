import { Link } from "react-router-dom";

function NavButton({ location, text, idx }) {
  return (
    <Link to={`${location}`} className={`NavButtonContainer ${idx}`}>
      {text}
    </Link>
  );
}

function Home() {
  return (
    <>
      <h1> Blue Nucleus </h1>

      <div className="NavButtonGrid space-x-5">
        <NavButton location="/onboarding" text="Onboarding" idx="one" />
        <NavButton location="/wiki" text="Internal Wiki" idx="two" />
        <NavButton location="/dashboard" text="Student Dashboard" idx="three" />
        <NavButton location="/sign-in" text="Sign In" idx="four" />
        <NavButton
          location="/create-account"
          text="Create Account"
          idx="five"
        />
        <NavButton location="/admin-portal" text="Admin Dashboard" idx="six" />
        <NavButton location="/directory" text="Directory" idx="seven" />
      </div>
    </>
  );
}

export default Home;
