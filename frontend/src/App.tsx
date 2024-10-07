import LoginButton from "./pages/Login";
import Profile from "./pages/Profile";
import LogoutButton from "./pages/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <>
          {" "}
          <Profile /> <br /> <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default App;
