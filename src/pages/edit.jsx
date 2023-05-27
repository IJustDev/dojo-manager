import { useContext, useEffect, useState } from "react";
import { EditableResourceForm } from "../components/resource-form/resource-form";
import { MasterFormValidator } from "../data-access/forms/master";
import { NavContext } from "./router";

export function EditPage() {
    const {current, back} = useContext(NavContext);
    const navParams = current.params;
    const [resource, setResource] = useState(undefined);
    const [validator] = useState(new MasterFormValidator());

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchResource() {
            const result = await navParams.resourceRepository.get(navParams.resourceId);
            setResource(result);
            setLoading(false);
        }

        fetchResource();

    }, []);

    const params= {
        onFormSubmit: () => {
            back();
        },
        ...current.params,
    }

    if (loading)
    return <p>Loading</p>;

    return <EditableResourceForm {...params} validator={validator} resource={resource}></EditableResourceForm>
}