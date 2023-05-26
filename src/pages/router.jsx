import { createContext, useContext } from "react";
import { Navbar } from "../components/navbar/navbar";
import { Analytics } from "./analytics";
import { Cockpit } from "./cockpit";

export const NavContext = createContext();

export function Router({mastersRepository, studentsRepository}) {
  const navContext = useContext(NavContext);

  switch (navContext.current) {
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