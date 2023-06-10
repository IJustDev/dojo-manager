import { FormValidator, RequiredValidator } from "./validator";

export class PlanForm extends FormValidator {
    fields = [
        {
            label: 'Name',
            formField: 'name',
            type: 'text',
            validators: [RequiredValidator],
        },
        {
            label: 'Pricing',
            formField: 'pricing',
            type: 'number',
            validators: [RequiredValidator],
        }
    ];
}