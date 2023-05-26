import {
  useState,
} from "react";
import environment from './environments/environment';
import { NavContext, Router } from "./pages/router";

function InternalApp({ mastersRepository, studentsRepository }) {
  const [current, setCurrent] = useState('cockpit');

  return (
    <NavContext.Provider value={{ setCurrent, current }}>
      <Router
        mastersRepository={mastersRepository}
        studentsRepository={studentsRepository}
      ></Router>
    </NavContext.Provider>
  );
}

function App() {
  const [user, setUser] = useState({});

  const {mastersRepository, studentsRepository} = environment;

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
