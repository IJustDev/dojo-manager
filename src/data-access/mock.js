import { MockMasters, MockStudents } from "./mock-data";

export const MockRepositoryFor = (sampleData = [], filterHandler = (items, filter) => { return items; }) => {
    const items = sampleData; 
    return {
        create: (data) => {
            const item = {id: sampleData.length + 1, ...data};
            items.push(item);
            console.log("Created ", item);
            return item;
        },
        delete: (id) => {
            const index = items.findIndex(c => c.id == id);
            items.splice(index, 1);
            return true;
        },
        update: (id, updatePayload) => {
            console.log("updating " + id + " with payload", updatePayload);
            return {id, ...updatePayload};
        },
        list: (filter = undefined) => {
            if (!!filter)
                return filterHandler(items, filter);
            return items;
        },
        count: () => {
            return items?.length;
        }
    }

}
export const MockStudentsRepository = MockRepositoryFor(MockStudents, (items, filter) => {
    const {query} = filter;
    if (!!query) {
        return items//.filter(c => c.first_name == query)
    }

    return items;
});
export const MockMastersRepository = MockRepositoryFor(MockMasters, (items, filter) => {
    if (!!filter.query)
        return items.filter(item => item.first_name.toLowerCase().indexOf(filter.query.toLowerCase()) !== -1) ?? [];
    return items;
});
