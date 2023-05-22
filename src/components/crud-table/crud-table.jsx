import * as React from 'react';
import { useEffect, useState } from "react";
import { transformLabel } from '../resource-form/resource-form';
import './crud-table.css';

const defaultActions = ['edit', 'create'];

const ActionComponent = ({ }) => {
    const actions = defaultActions;
    return actions.map((actionDefinition) => {
        return <p onClick={() => {
            actionDefinition.callback();
        }}>{actionDefinition.name}</p>
    })
}

export function CrudTable({ data }) {

    const headers = Object.keys(data[0]);

    return <table>
        <thead>
            {headers.map((header) => {
                return <th>{transformLabel(header)}</th>;
            })}
            <th>actions</th>
        </thead>
        <tbody>
            {data.map((dataRow) => {
                return <tr>
                    {Object.values(dataRow).map((col) => {
                        return <td>{col}</td>
                    })}
                    <td><ActionComponent></ActionComponent></td>
                </tr>
            })}
            <tr>
            </tr>
        </tbody>
    </table>;
}

export function UseCreateCrudTableFor({ repository }) {

    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const retrievedData = await repository.list();
            setData(retrievedData);
            setFetched(true);
        }

        fetchData();
    }, [fetched]);
    
    if (!fetched) {
        return <p>Loading...</p>;
    }

    if (data == undefined || data.length == 0) {
        return 'No data';
    }

    return <section>
        <CrudTable data={data}></CrudTable>
    </section>;
}