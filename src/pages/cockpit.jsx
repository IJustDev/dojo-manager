import './cockpit.css';
import { UseCreateCrudTableFor } from "../components/crud-table/crud-table";
import { Navbar } from "../components/navbar/navbar";
import { useDataAccess } from '../data-access/data-layer';

export function Cockpit() {
  const {studentsRepository, plansRepository} = useDataAccess();

  return (
    <>
      <header>
        <Navbar></Navbar>
        <h1>Cockpit</h1>
        <h3>Manage all your data in one place</h3>
      </header>
      <hr></hr>
      <main>
        <section>
          <header>
            <h2>Students</h2>
          </header>
          <UseCreateCrudTableFor
            repository={studentsRepository}
            headers={['id', 'first_name', 'last_name', 'plan']}
          ></UseCreateCrudTableFor>
        </section>
        <aside>
          <header>
            <h2>Plans</h2>
          </header>
          <UseCreateCrudTableFor
            query_field='name'
            repository={plansRepository}
            headers={['id', 'name', 'pricing']}
          ></UseCreateCrudTableFor>
        </aside>
      </main>
    </>
  );
}