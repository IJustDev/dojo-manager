import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/navbar/navbar";
import { useDataAccess } from "../data-access/data-layer";
import { Analytics } from "./analytics";
import { Cockpit } from "./cockpit";
import { CreatePage } from "./create";
import { EditPage } from "./edit";

export const NavContext = createContext();

export const useLogin = () => {
  const [user, setUser] = useState(undefined);
  const { sessionRepository } = useDataAccess();

  const signIn = async (username, password) => {
    const result = (await sessionRepository.login(username, password))
    setUser(result);
  }

  useEffect(() => {
    const fetch = async () => {
      const account = await sessionRepository.getSavedUser();

      if (!!account)
        setUser(account);
    }
    fetch();
  }, []);

  return { user, signIn };
}

export function NavProvider({ children }) {
  const [current, setCurrent] = useState({ path: 'cockpit', params: {} });
  const [history, setHistory] = useState([{ path: 'cockpit', params: {} }]);

  const loadInitial = () => {
    const pathFromHash = window.location.hash.split('#')[1]
    if (pathFromHash == 'edit' || pathFromHash == 'create') return;
    setCurrent({ path: pathFromHash ?? 'cockpit' });
    setHistory([{ path: pathFromHash ?? 'cockpit' }])
  }

  useEffect(() => {
    window.addEventListener("hashchange", e => loadInitial());
    loadInitial();
  }, []);

  const updateCurrent = ({ path, params }) => {
    window.location.hash = `${path}`;
    setCurrent({ path, params });
  }

  const push = (path, params) => {
    setHistory(prev => [...prev, { path, params }]);
    updateCurrent({ path, params });
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

function LoginScreen({ signIn }) {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (formValues) => {
    await signIn(formValues.email, formValues.password);
  }

  return <section>

    <form onSubmit={handleSubmit(onSubmit)}>
      <header>
        <h1>Login</h1>
        <p>Login please</p>
      </header>
      <label for="email">Email</label>
      <input type="text" {...register('email')} />
      <label for="password">Password</label>
      <input type="password" {...register('password')} />
      <input type="submit" />
    </form>
  </section>
}

export function Router() {
  const navContext = useContext(NavContext);
  const { user, signIn } = useLogin();

  if (user == null) {
    return <LoginScreen signIn={signIn}></LoginScreen>;
  }

  switch (navContext.current.path) {
    case 'edit':
      return (
        <EditPage></EditPage>
      )
    case 'create':
      return (
        <CreatePage></CreatePage>
      )
    case 'cockpit':
      return (
        <Cockpit />
      );
    case 'analytics':
      return (
        <Analytics />
      );
    default:
      return <header>
        <Navbar />
      </header>
  }

}