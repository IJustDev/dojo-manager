import { DataAccessProvider } from "./data-access/data-layer";
import { NavProvider, Router } from "./pages/router";
import './App.css';
import { DialogContext, DialogProvider } from "./components/dialog/dialog";
import { useContext } from "react";

function WithDialog({ children }) {
  const {DialogComponent, open} = useContext(DialogContext);

  const RenderDialog = () => {
    return <dialog open={open} style={{display: open? 'flex' : 'none'}}>
        <div style={{marginRight: 'auto', marginLeft: 'auto'}}>
        {DialogComponent}
        </div>
    </dialog>
  }

  return <><RenderDialog></RenderDialog>{children}</>;
}

function App() {

  return (
    <NavProvider>
      <DataAccessProvider>
        <DialogProvider>
          <WithDialog>
            <Router></Router>
          </WithDialog>
        </DialogProvider>
      </DataAccessProvider>
    </NavProvider>
  );
}

export default App;
