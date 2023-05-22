import { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart } from 'victory';
import { UseCreateCrudTableFor } from './components/crud-table/crud-table';
import { EditableResourceForm } from './components/resource-form/resource-form';
import { AppWriteClient, MastersRepository, MockMastersRepository, MockStudentsRepository, StudentsRepository } from './data-access/app-write';

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

function InternalApp({ mastersRepository, studentsRepository }) {

  const data = [
    { month: 'January', members: 43 },
    { month: 'February', members: 45 },
    { month: 'March', members: 46 },
    { month: 'April', members: 50 },
    { month: 'June', members: 56 },
    { month: 'July', members: 62 },
    { month: 'August', members: 60 },
    { month: 'October', members: 65 },
  ];

  return (
    <>
      <header>
        <nav>
          <a href="https://andybrewer.github.io/mvp/">Dojad</a>
          <ul>
            <li>Students</li>
            <li>Masters</li>
            <li>Courses</li>
          </ul>
        </nav>
        <h1>✨ Your Dojo in <u>Numbers</u> 🥋</h1>
        <p>This is how you're doing at a glance </p>

        <section >
          <aside>
            <h3>New registrations this month</h3>
            <p>5</p>
          </aside>
          <aside>
            <h3>Active members</h3>
            <p>64 <sup>+ 5 this month</sup></p>
          </aside>
          <aside>
            <h3>Revenue</h3>
            <p>4.480 €</p>
          </aside>
        </section>
        <VictoryChart>
          <VictoryBar data={data} x={'month'} y={'members'} style={{ data: { fill: '#2596be', cornerRadius: '5px' } }} />
        </VictoryChart>
      </header>
      <hr></hr>
      <main>
        <section>
          <header>
            <h2>Meister</h2>
          </header>
          <UseCreateCrudTableFor repository={mastersRepository}></UseCreateCrudTableFor>
        <hr/>
        <EditableResourceForm action={'create'} resource={{first_name: 1, last_name: 1}}resourceRepository={mastersRepository} submitted={() => {alert('asdf')}}></EditableResourceForm>
        </section>
      </main>
    </>);
}

function App() {
  const [user, setUser] = useState(null);

  useLogin(setUser);

  if (user == null) {
    return <p>Logging you in...</p>;
  }

  return <InternalApp mastersRepository={MastersRepository} studentsRepository={StudentsRepository}></InternalApp>
}

export default App;
