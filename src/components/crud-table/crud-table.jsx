import * as React from 'react';
import { useEffect, useState } from "react";
import { transformLabel } from '../resource-form/resource-form';
import './crud-table.css';

const CrudTableOptions = ({ item }) => {
    const actions = [{
        label: 'Delete',
        destructive: true,
        callback: (item) => {
            alert("Delete: " + JSON.stringify(item));
        }
    }, {
        label: 'Edit',
        destructive: false,
        callback: (item) => {
            alert("Edit: " + JSON.stringify(item));
        }
    }
    ]

    return actions.map((actionDefinition) => {
        return <p
            style={
                {
                    ...(actionDefinition.destructive ? { color: 'red' } : {}),
                    cursor: 'pointer',
                }
            }
            onClick={() => {
                actionDefinition.callback(item);
            }}>{actionDefinition.label}</p>
    })
}

export function CrudTable({ data, headers, style }) {
    const hasData = data == undefined || data.length == 0;

    headers ??= Object.keys(data[0]);

    return <table style={style}>
        <thead>
            {headers.map((header) => {
                return <th>{transformLabel(header)}</th>;
            })}
            <th>Actions</th>
        </thead>
        <tbody>
            {data.map((dataRow) => {
                return <tr>
                    {headers.map((header) => {
                        return <td>{dataRow[header]}</td>
                    })}
                    <td><CrudTableOptions item={dataRow}></CrudTableOptions></td>
                </tr>
            })}
        </tbody>
    </table>;
}

function useSearchbar() {
    const [currentSearch, setCurrentSearch] = useState('');

    return {
        Searchbar: <>
        <input type="text" placeholder={'Search...'}onChange={(event) => {
            setCurrentSearch(event.target.value);
        }} value={currentSearch}></input>
        </>,
        currentSearch
    };
}

export function UseCreateCrudTableFor({ repository, headers, style }) {

    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState(false);

    const {Searchbar, currentSearch} = useSearchbar();

    useEffect(() => {
        async function fetchData() {
            const retrievedData = await repository.list({query: currentSearch});
            setData(retrievedData);
            setFetched(true);
        }

        fetchData();
    }, [fetched, currentSearch]);

    if (!fetched) {
        return <p>Loading...</p>;
    }

    return <>
        {Searchbar}
        <CrudTable style={style} headers={headers} data={data} />
        <button>Create</button>
    </>
}