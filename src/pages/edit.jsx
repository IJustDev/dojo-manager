import { useContext } from "react";
import { EditableResourceForm } from "../components/resource-form/resource-form";
import { NavContext } from "./router";

export function EditPage() {
    const {current, back} = useContext(NavContext);

    const params= {
        onFormSubmit: () => {
            back();
        },
        ...current.params,
    }

    return <EditableResourceForm {...params}></EditableResourceForm>
}