import {
  useState,
} from "react";
import { DataAccessProvider } from "./data-access/data-layer";
import { NavProvider, Router } from "./pages/router";

function InternalApp() {
  return (
    <NavProvider>
      <DataAccessProvider>
        <Router></Router>
      </DataAccessProvider>
    </NavProvider>
  );
}

function App() {
  const [user, setUser] = useState({});

  if (user == null) {
    return <p>Logging you in...</p>;
  }

  return (
    <InternalApp></InternalApp>
  );
}

export default App;
