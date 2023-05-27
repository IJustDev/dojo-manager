import { FormValidator, RequiredValidator } from "./validator";

export class PlanForm extends FormValidator {
    fields = [
        {
            label: 'Name',
            formField: 'name',
            type: 'text',
            validators: [RequiredValidator],
        }
    ];
}