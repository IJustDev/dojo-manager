const RequiredValidator = {
    error: 'Field is required!',
    validate(value) {
        return !!value && value.length > 0;
    }
}

const RegexValidator = (regex) => ({
    error: 'Must match ' + regex,
    validate(value) {
        return new RegExp(regex).test(value);
    }
})

export class ValidatorError extends Error {}

export class FormValidator {
    fields = [];

    validate(formValues) {
        const keys = Object.keys(formValues);
        keys.forEach((key) => {
            const value = formValues[key];
            
            const correspondingField = this.fields.find(c => c.form_field == key);

            const validators = correspondingField?.validators ?? [];

            validators.forEach((validator) => {
                if (!validator.validate(value)) {
                    throw new ValidatorError(correspondingField?.label + ': ' + validator.error);
                }
            })
        });
    }
}

export class MasterFormValidator extends FormValidator {

    fields = [{
        label: 'Hourly rate in Eur',
        form_field: 'rate',
        validators: [RequiredValidator, RegexValidator('\\d')],
        type: 'number',
    },
    {
        label: 'First Name',
        form_field: 'first_name',
        required: true,
        type: 'string'
    },
    {
        label: 'Last Name',
        form_field: 'last_name',
        required: true,
        type: 'string'
    }];
}
