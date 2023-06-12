import { FormValidator, RegexValidator, RequiredValidator } from "./validator";

export class MasterModel extends FormValidator {
    modelName = 'master';

    fields = [
        {
            label: 'First Name',
            formField: 'first_name',
            validators: [RequiredValidator],
            type: 'text'
        },
        {
            label: 'Last Name',
            formField: 'last_name',
            validators: [RequiredValidator],
            type: 'text',
        },
        {
            label: 'Hourly rate in EUR',
            formField: 'rate',
            validators: [RequiredValidator, RegexValidator('\\d')],
            type: 'text',
        },
    ];
}
