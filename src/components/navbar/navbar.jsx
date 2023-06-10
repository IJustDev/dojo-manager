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
      <a href="https://andybrewer.github.io/mvp/">Dojad</a>
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