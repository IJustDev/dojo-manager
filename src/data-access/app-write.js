import { ID, Account, Databases, Client, Query } from 'appwrite';
import { MasterModel } from './forms/master';
import { PlanModel } from './forms/plan';
import { StudentModel } from './forms/student';
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

export const RepositoryFor = (formDefinition, collectionName) => {
    const defaultAppWriteFilter = (filter) => {
        const queries = Object.keys(filter).map((key) => {
            return Query.search(key, filter[key]);
        });

        return AppWriteClient.provider().database.listDocuments(databaseId, collectionName, queries);
    }

    const repo = {
        create: async (data) => {
            return (await AppWriteClient.provider().database.createDocument(databaseId, collectionName, ID.unique(), data));
        },
        delete: async (id) => {
            return (await AppWriteClient.provider().database.deleteDocument(databaseId, collectionName, id));
        },
        update: (id, updatePayload) => {
            const fieldsToUpdate = formDefinition.fields.map(c => c.formField);

            const actualPayload = fieldsToUpdate.reduce((prev, curr) => {
                prev[curr] = updatePayload[curr];

                return prev;
            }, {})
            return AppWriteClient.provider().database.updateDocument(databaseId, collectionName, id, actualPayload);
        },
        listRaw: async (queries) => {
            return (await AppWriteClient.provider().database.listDocuments(databaseId, collectionName, queries)).documents.map(c => ({ ...c, id: c.$id }));
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


export const SessionsRepository = {
    login: async (username, password) => {
        try {
            return (await AppWriteClient.login(username, password));
        } catch(error) {
            alert(error.message);
            return;
        }
    },
    getSavedUser: async () => {
        try {
            return (await AppWriteClient.provider().account.get());
        } catch {
            return undefined;
        }
    }
}

export const MastersRepository = RepositoryFor(new MasterModel(), "646b50a7d6dd37020d7b");
export const StudentsRepository = RepositoryFor(new StudentModel(), "646b50ad2050a56378d2");
export const PlansRepository = RepositoryFor(new PlanModel(), "plans");