import { DataAccessProvider } from "./data-access/data-layer";
import { NavProvider, Router } from "./pages/router";

function App() {

  return (
    <NavProvider>
      <DataAccessProvider>
        <Router></Router>
      </DataAccessProvider>
    </NavProvider>
  );
}

export default App;
