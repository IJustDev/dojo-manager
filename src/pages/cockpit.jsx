import './cockpit.css';
import { UseCreateCrudTableFor } from "../components/crud-table/crud-table";
import { Navbar } from "../components/navbar/navbar";
import { useEffect } from 'react';
import { AppWriteClient } from '../data-access/app-write';

export function Cockpit({ studentsRepository, mastersRepository }) {
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
            <h2>Meister</h2>
          </header>
          <UseCreateCrudTableFor
            repository={mastersRepository}
          ></UseCreateCrudTableFor>
        </section>
      </main>
    </>
  );
}