import { createContext, useContext, useEffect, useState } from "react";
import { Navbar } from "../components/navbar/navbar";
import { Analytics } from "./analytics";
import { Cockpit } from "./cockpit";

export const NavContext = createContext();

export function NavProvider({children}) {
  const [current, setCurrent] = useState({path: 'cockpit', params: {}});
  const [history, setHistory] = useState([]);

  const loadInitial = () => {
    const pathFromHash = window.location.hash.split('#')[1]
    setCurrent({path: pathFromHash ?? 'cockpit'});
  }

  useEffect(() => {
    loadInitial();
  }, []);

  const updateCurrent = ({path, params}) => {
    window.location.hash = `${path}${params ? '?' + JSON.stringify(params): ''}`;
    setCurrent({path, params});
  }

  const push = (path, params) => {
    setHistory(prev => [...prev, {path, params}]);
    updateCurrent({path, params});
  }
  
  const back = () => {
    const previous = history.pop();
    setHistory(history);
    updateCurrent(previous);
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
      return (
        <header>
          <h1>Edit resource</h1>
          <p>{JSON.stringify(params)}</p>
        </header>
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