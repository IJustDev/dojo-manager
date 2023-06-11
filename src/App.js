import { DataAccessProvider } from "./data-access/data-layer";
import { NavProvider, Router } from "./pages/router";
import './App.css';
import { DialogContext, DialogProvider } from "./components/dialog/dialog";
import { useContext } from "react";

function WithDialog({ children }) {
  const { DialogComponent, open, closeDialog } = useContext(DialogContext);

  const RenderDialog = () => {
    return <dialog open={open} style={{ display: open ? 'flex' : 'none' }}>
      <div style={{top: '16px', right: '16px', position: 'absolute', cursor: 'pointer', fontSize: '18px' }} onClick={() => {closeDialog()}}>
        X
      </div>
      <div style={{ marginRight: 'auto', marginLeft: 'auto'}}>
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
