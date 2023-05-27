import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export const transformLabel = (key) => {
    const parts = key.split('_');
    return parts.map((part) => {
        const sliced = part.slice(1);
        return part.charAt(0).toUpperCase() + sliced;
    }).join(' ');
}

export function EditableResourceForm({ resource, resourceRepository, action, onFormSubmit, formDefinition }) {
    const keys = formDefinition.fields;
    const { register, handleSubmit } = useForm({
        defaultValues: useMemo(() => {
            return action == 'update' ? resource : {};
        }),
    });

    const onSubmit = (data) => {

        try {
            formDefinition.validate(data);
        } catch (error) {
            alert(error)
            return;
        }

        const act = action == 'update' ? () => {
            resourceRepository.update(resource.id, data);
        } : () => {
            resourceRepository.create(data);
        }

        act();
        if (!!onFormSubmit) {
            onFormSubmit();
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <header>
            <h2>Create resource</h2>
        </header>
        {keys.map(c => {
            return <>
                <label for={c.label}>{transformLabel(c.label)}</label>
                {c.customField ? <c.customField selectProps={register(c.formField)}></c.customField> :
                    <input type={c.type ?? 'text'} {...register(c.formField)} />
                }
            </>
        })}
        <button type={'submit'}>{action.toUpperCase()}</button>
    </form>;
}

export function ReadonlyResourceForm({ resource }) {
    const keys = Object.keys(resource);

    return <table>
        {keys.map(c => {
            return <tr>
                <td>{c}</td>
                <td>{resource[c]}</td>

            </tr>;
        })}
    </table>;
}