import { useEffect, useState } from "react";
import { useDataAccess } from "../data-layer";
import { Select } from "./select";
import { FormValidator, RequiredValidator } from "./validator";

const usePlanSelect = ({ selectProps }) => {
    const { planRepository } = useDataAccess();
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = (await planRepository.list());
            const x = data.map(c => ({ label: c.name, value: c.id }));
            setOptions(x)
            setLoading(false);
        }

        fetch();
    }, [])

    if (loading)
        return <p>loading</p>

    return <Select options={options} selectProps={selectProps}></Select>
}

export class StudentForm extends FormValidator {

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
        }
    ];

    async populateForView(item, dataAccess) {
        const { planRepository } = dataAccess;
        try {
            const x = (await planRepository.get(item.plan));
            return { ...item, plan: x?.name };
        } catch {
            return { ...item };
        }
    }
}