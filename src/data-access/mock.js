import { MockMasters, MockStudents } from "./mock-data";

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
        },
        count: () => {
            return items?.length;
        }
    }

}
export const MockStudentsRepository = MockRepositoryFor(MockStudents);
export const MockMastersRepository = MockRepositoryFor(MockMasters);
