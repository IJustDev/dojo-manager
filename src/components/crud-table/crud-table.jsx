import * as React from 'react';
import { useEffect, useState, useContext } from "react";
import { useDataAccess } from '../../data-access/data-layer';
import { NavContext } from '../../pages/router';
import { transformLabel } from '../resource-form/resource-form';
import './crud-table.css';

const CrudTableOptions = ({ item, actions }) => {
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

export function CrudTable({ data, headers, style, actions, formDefinition }) {
    const hasData = !!data && data.length > 0;
    const dataAccess = useDataAccess();
    const [actualData, setActualData] = useState([]);

    useEffect(() => {
        const populate = async () => {
            const myData = [];
            for (const item of data) {
                const x =(await formDefinition.populateForView(item, dataAccess));
                myData.push(x);
            }

            setActualData(myData);
        }

        populate();
    }, []);


    return <table style={style}>
        <thead>
            {headers.map((header) => {
                return <th>{transformLabel(header)}</th>;
            })}
            <th>Actions</th>
        </thead>
        <tbody>
            {hasData ? actualData.map((dataRow) => {
                return <tr>
                    {headers.map((header) => {
                        return <td>{dataRow[header]}</td>
                    })}
                    <td><CrudTableOptions item={dataRow} actions={actions}></CrudTableOptions></td>
                </tr>
            }) : <p>No data</p>}
        </tbody>
    </table>;
}

function useSearchbar() {
    const [currentSearch, setCurrentSearch] = useState('');

    return {
        Searchbar: <>
            <input type="text" placeholder={'Search...'} onChange={(event) => {
                setCurrentSearch(event.target.value);
            }} value={currentSearch}></input>
        </>,
        currentSearch
    };
}

export function UseCreateCrudTableFor({ repository, headers, style, query_field = 'first_name' }) {
    const [updatedAt, setUpdatedAt] = useState(new Date());
    const formDefinition = repository.formDefinition;

    const { push, history } = useContext(NavContext);

    const actions = [{
        label: 'Delete',
        destructive: true,
        callback: (item) => {
            repository.delete(item.id);
            setUpdatedAt(new Date());
        }
    }, {
        label: 'Edit',
        destructive: false,
        callback: (item) => {
            push('edit', { resourceId: item.id, resourceRepository: repository, action: 'update', formDefinition });
            setUpdatedAt(new Date());
        }
    }
    ]

    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState(false);

    const { Searchbar, currentSearch } = useSearchbar();

    useEffect(() => {
        async function fetchData() {
            const filter = currentSearch != '' ?{ [query_field]: currentSearch }: {};
            const retrievedData = await repository.list(filter);
            setData(retrievedData);
            setFetched(true);
        }

        fetchData();
    }, [fetched, currentSearch, updatedAt, history]);

    if (!fetched) {
        return <p>Loading...</p>;
    }

    return <>
        {Searchbar}
        <CrudTable style={style} actions={actions} headers={headers} data={data} formDefinition={repository.formDefinition}/>
        <button onClick={() => {
            push('create', {resourceRepository: repository, formDefinition})
        }}>Create</button>
    </>
}