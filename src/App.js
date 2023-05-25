import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { VictoryBar, VictoryChart } from "victory";
import { UseCreateCrudTableFor } from "./components/crud-table/crud-table";
import { EditableResourceForm } from "./components/resource-form/resource-form";
import environment from './environments/environment';

const NavContext = createContext();

/*
const useLogin = (setUser) => {
  useEffect(() => {
    async function signIn() {
      const account = await AppWriteClient.provider().account.get();
      if (account) {
        setUser(account);
      } else {
        const result = await AppWriteClient.login('test@royalzsoftware.de', 'test1234');
        setUser(result);
      }
    }

    signIn();
  }, []);
}
*/

function Navbar() {
  const NavItem = ({ children, index }) => {
    const { setCurrent } = useContext(NavContext);

    return (
      <a
        href="#"
        onClick={() => {
          setCurrent(index);
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
          <NavItem index={0}>
            Mike<sup>New</sup>
          </NavItem>
        </li>
        <li>
          <NavItem index={1}>Analytics</NavItem>
        </li>
        <li>
          <NavItem index={0}>Cockpit</NavItem>
        </li>
      </ul>
    </nav>
  );
}

function Analytics({ studentsRepository, mastersRepository }) {
  const [membersCount, setMembersCount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setMembersCount(await studentsRepository.count());
    };

    fetch();
  }, []);
  const data = [
    { month: "January", members: 43 },
    { month: "February", members: 45 },
    { month: "March", members: 46 },
    { month: "April", members: 50 },
    { month: "June", members: 56 },
    { month: "July", members: 62 },
    { month: "August", members: 60 },
    { month: "October", members: 65 },
  ];
  return (
    <>
      <header>
        <Navbar></Navbar>
        <h1>
          ✨ Your Dojo in <u>Numbers</u> 🥋
        </h1>
        <p>This is how you're doing at a glance </p>

        <section>
          <aside>
            <h3>New registrations this month</h3>
            <p>5</p>
          </aside>
          <aside>
            <h3>Active members</h3>
            <p>
              {membersCount} <sup>+ 5 this month</sup>
            </p>
          </aside>
          <aside>
            <h3>Revenue</h3>
            <p>4.480 €</p>
          </aside>
        </section>
        <VictoryChart>
          <VictoryBar
            data={data}
            x={"month"}
            y={"members"}
            style={{ data: { fill: "#2596be", cornerRadius: "5px" } }}
          />
        </VictoryChart>
      </header>
      <hr></hr>
    </>
  );
}

function Cockpit({ studentsRepository, mastersRepository }) {
  return (
    <>
      <header>
        <Navbar></Navbar>
        <h1>Cockpit</h1>
        <h3>Manage all your data in one place</h3>
      </header>
      <main>
        <section>
          <header>
            <h2>Meister</h2>
          </header>
          <UseCreateCrudTableFor
            repository={mastersRepository}
          ></UseCreateCrudTableFor>
          <div style={{maxHeight: '300px', overflow: 'scroll'}}>
          <UseCreateCrudTableFor
            repository={studentsRepository}
          ></UseCreateCrudTableFor>
</div>
          <hr />
          <EditableResourceForm
            action={"create"}
            resource={{ first_name: 1, last_name: 1 }}
            resourceRepository={mastersRepository}
            submitted={() => {
            }}
          ></EditableResourceForm>
        </section>
      </main>
    </>
  );
}

function Router({ mastersRepository, studentsRepository }) {
  const navContext = useContext(NavContext);

  switch (navContext.current) {
    case 0:
      return (
        <Cockpit
          mastersRepository={mastersRepository}
          studentsRepository={studentsRepository}
        />
      );
    case 1:
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

function InternalApp({ mastersRepository, studentsRepository }) {
  const [current, setCurrent] = useState(0);

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

  // useLogin(setUser);

  if (user == null) {
    return <p>Logging you in...</p>;
  }

  return (
    <InternalApp
      mastersRepository={environment.mastersRepository}
      studentsRepository={environment.studentsRepository}
    ></InternalApp>
  );
}

export default App;
