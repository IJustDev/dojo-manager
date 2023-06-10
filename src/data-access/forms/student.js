import { useEffect, useState } from "react";
import { useDataAccess } from "../data-layer";
import { Select } from "./select";
import { FormValidator, RequiredValidator } from "./validator";

const usePlanSelect = ({ selectProps }) => {
    const { plansRepository } = useDataAccess();
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = (await plansRepository.list());
            const x = data.map(c => ({ label: c.name, value: c.id }));
            setOptions(x)
            setLoading(false);
        }

        fetch();
    }, [])

    if (loading)
        return <p>loading</p>

    return <Select options={options} allowEmpty={true} selectProps={selectProps}></Select>
}

export class StudentForm extends FormValidator {
    modelName = 'student';

    fields = [
        {
            label: 'First Name',
            formField: 'first_name',
            validators: [RequiredValidator],
            type: 'text',
        },
        {
            label: 'Last Name',
            formField: 'last_name',
            validators: [RequiredValidator],
            type: 'text',
        },
        {
            label: 'Plan',
            formField: 'plan',
            validators: [RequiredValidator],
            customField: usePlanSelect,
        },
        {
            label: 'address',
            formField: 'address',
            validators: [RequiredValidator],
        }
    ];

    async populateForView(item, dataAccess) {
        const { plansRepository } = dataAccess;
        if (item.plan == 'undefined')
            return {...item, pretty_plan: undefined};
        try {
            const plan = (await plansRepository.get(item.plan));
            return { ...item, pretty_plan: plan.name + ' - $ ' + plan.pricing};
        } catch {
            return { ...item };
        }
    }
}