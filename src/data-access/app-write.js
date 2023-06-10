import { ID, Account, Databases, Client, Query } from 'appwrite';
import { useEffect } from 'react';
import { MasterForm } from './forms/master';
import { StudentForm } from './forms/student';
export const AppWriteClient = {
    sdk: null,

    provider: () => {
        if (AppWriteClient.sdk) {
            return AppWriteClient.sdk;
        }
        const appWrite = new Client() 
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('646b4f6228dccbab6666');
            
        const account = new Account(appWrite);
        const database = new Databases(appWrite);
        
        AppWriteClient.sdk = {database, account};
        
        return AppWriteClient.sdk;
    },
    login: (email, password) => {
        return AppWriteClient.provider().account.createEmailSession(email, password);
    }
};

const databaseId = '646b508690f6c1c0362c';

export const DefaultAppWriteFilter = (filter) => {
}


export const RepositoryFor = (formDefinition, collectionName) => {
    const defaultAppWriteFilter = (filter) => {
        const queries = Object.keys(filter).map((key) => {
            return Query.equal(key, filter[key]);
        });

        return AppWriteClient.provider().database.listDocuments(databaseId, collectionName, queries);
    }

    const repo = {
        create: (data) => {
            return AppWriteClient.provider().database.createDocument(databaseId, collectionName, ID.unique(), data);
        },
        delete: (id) => {
            return AppWriteClient.provider().database.deleteDocument(databaseId, collectionName, id);
        },
        update: (id, updatePayload) => {
            return AppWriteClient.provider().database.updateDocument(databaseId, collectionName, id, updatePayload);
        },
        list: async (filter = undefined) => {
            const {documents} = (
                !!filter ? (await defaultAppWriteFilter(filter)) : (await AppWriteClient.provider().database.listDocuments(databaseId, collectionName)));
                

            return documents.map(c => ({ ...c, id: c.$id }));
        },
        get: async (id) => {
            const item = (await AppWriteClient.provider().database.getDocument(databaseId, collectionName, id));
            return { ...item, id: id };
        },
        count: async () => {
            return (await repo.list()).length;
        },
        formDefinition
    }

    return repo;
}

export const useLogin = (setUser) => {
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

export const SessionsRepository = {
    user: undefined,

    login: () => {
    }
}

export const MastersRepository = RepositoryFor(new MasterForm(), "646b50a7d6dd37020d7b");
export const StudentsRepository = RepositoryFor(new StudentForm(), "646b50ad2050a56378d2");
export const ClassesRepository = RepositoryFor(undefined, "classes");
