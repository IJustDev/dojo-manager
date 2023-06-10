import { useContext } from "react";
import { NavContext } from "../../pages/router";

export function Navbar() {
  const NavItem = ({ children, path }) => {
    const { setCurrent } = useContext(NavContext);

    return (
      <a
      style={{cursor: 'pointer'}}
        onClick={() => {
          setCurrent({path});
        }}
      >
        {children}
      </a>
    );
  };

  return (
    <nav>
      <NavItem path={'analytics'}>Dojo Manager</NavItem>
      <ul>
        <li>
          <NavItem path={'analytics'}>Analytics</NavItem>
        </li>
        <li>
          <NavItem path={'cockpit'}>Cockpit</NavItem>
        </li>
      </ul>
    </nav>
  );
}