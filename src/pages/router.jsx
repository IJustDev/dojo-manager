import { createContext, useContext, useEffect, useState } from "react";
import { Navbar } from "../components/navbar/navbar";
import { EditableResourceForm } from "../components/resource-form/resource-form";
import { Analytics } from "./analytics";
import { Cockpit } from "./cockpit";
import { EditPage } from "./edit";

export const NavContext = createContext();

export function NavProvider({children}) {
  const [current, setCurrent] = useState({path: 'cockpit', params: {}});
  const [history, setHistory] = useState([{path: 'cockpit', params: {}}]);

  const loadInitial = () => {
    const pathFromHash = window.location.hash.split('#')[1]
    if (pathFromHash == 'edit') return;
    setCurrent({path: pathFromHash ?? 'cockpit'});
    setHistory([{path: pathFromHash ?? 'cockpit'}])
  }

  useEffect(() => {
    loadInitial();
  }, []);

  const updateCurrent = ({path, params}) => {
    window.location.hash = `${path}`;
    setCurrent({path, params});
  }

  const push = (path, params) => {
    setHistory(prev => [...prev, {path, params}]);
    updateCurrent({path, params});
  }
  
  const back = () => {
    history.pop();
    const previousItem = history[history.length - 1];
    setHistory(history);
    updateCurrent(previousItem);
  }

  return <NavContext.Provider value={{ setCurrent: updateCurrent, current, push, back }}>
    {children}
  </NavContext.Provider>;

}

export function Router({mastersRepository, studentsRepository}) {
  const navContext = useContext(NavContext);
  const params = navContext.current.params;

  switch (navContext.current.path) {
    case 'edit':
      const data = navContext.current.params;
      return (
      <EditPage></EditPage>
      )
    case 'cockpit':
      return (
        <Cockpit
          mastersRepository={mastersRepository}
          studentsRepository={studentsRepository}
        />
      );
    case 'analytics':
      return (
        <Analytics
          mastersRepository={mastersRepository}
          studentsRepository={studentsRepository}
        />
      );
    default:
      return <header>
        <Navbar/>
      </header>
  }

}