import {
  useState,
} from "react";
import environment from './environments/environment';
import { NavProvider, Router } from "./pages/router";

function InternalApp({ mastersRepository, studentsRepository }) {
  return (
    <NavProvider>
      <Router
        mastersRepository={mastersRepository}
        studentsRepository={studentsRepository}
      ></Router>
    </NavProvider>
  );
}

function App() {
  const [user, setUser] = useState({});

  const { mastersRepository, studentsRepository } = environment;

  if (user == null) {
    return <p>Logging you in...</p>;
  }

  return (
    <InternalApp
      mastersRepository={mastersRepository}
      studentsRepository={studentsRepository}
    ></InternalApp>
  );
}

export default App;
