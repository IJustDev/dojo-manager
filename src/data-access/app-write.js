import { ID, Account, Databases, Client } from 'appwrite';
import { MockMasters, MockStudents } from './mock-data';

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

export const MockRepositoryFor = (sampleData = []) => {
    const items = sampleData; 
    return {
        create: (data) => {
            const item = {id: sampleData.length + 1, ...data};
            items.push(item);
            console.log("Created ", item);
            return item;
        },
        delete: (id) => {
            items = items.splice(items.indexOf(c => c.id == id), 1);
            return true;
        },
        update: (id, updatePayload) => {
            console.log("updating " + id + " with payload", updatePayload);
            return {id, ...updatePayload};
        },
        list: () => {
            return items;
        }
    }

}

export const RepositoryFor = (collectionName) => {
    return {
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
        }
    }
}

export const MockStudentsRepository = MockRepositoryFor(MockStudents);
export const MockMastersRepository = MockRepositoryFor(MockMasters);

export const MastersRepository = RepositoryFor("646b50a7d6dd37020d7b");
export const StudentsRepository = RepositoryFor("646b50ad2050a56378d2");
export const ClassesRepository = RepositoryFor("classes");
