import { ID, Account, Databases, Client } from 'appwrite';
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


export const RepositoryFor = (collectionName) => {
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
        list: async () => {
            return (await AppWriteClient.provider().database.listDocuments(databaseId, collectionName)).documents;
        },
        count: async () => {
            return (await repo.list()).length;
        }
    }

    return repo;
}

export const MastersRepository = RepositoryFor("646b50a7d6dd37020d7b");
export const StudentsRepository = RepositoryFor("646b50ad2050a56378d2");
export const ClassesRepository = RepositoryFor("classes");
