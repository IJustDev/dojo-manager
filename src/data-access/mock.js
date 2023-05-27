import { MasterForm } from "./forms/master";
import { PlanForm } from "./forms/plan";
import { StudentForm } from "./forms/student";
import { MockMasters, MockStudents } from "./mock-data";

export const MockRepositoryFor = (formDefinition, sampleData = [], filterHandler = (items, filter) => { return items; }) => {
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
            const itemIndex = items.findIndex(c => c.id == id);
            items[itemIndex] = {
                ...items[itemIndex],
                ...updatePayload,
            };
            return {id, ...updatePayload};
        },
        list: (filter = undefined) => {
            if (!!filter)
                return filterHandler(items, filter);
            return items;
        },
        get: (id) => {
            return items.find(c => c.id === id);
        },
        count: () => {
            return items?.length;
        },
        formDefinition,
    }

}
export const MockStudentsRepository = MockRepositoryFor(new StudentForm(), MockStudents, (items, filter) => {
    const {query} = filter;
    if (!!query) {
        return items//.filter(c => c.first_name == query)
    }

    return items;
});
export const MockMastersRepository = MockRepositoryFor(new MasterForm(), MockMasters, (items, filter) => {
    if (!!filter.query)
        return items.filter(item => item.first_name.toLowerCase().indexOf(filter.query.toLowerCase()) !== -1) ?? [];
    return items;
});

export const MockPlanRepository = MockRepositoryFor(new PlanForm(), [{name: 'Plan', id: 0}]);