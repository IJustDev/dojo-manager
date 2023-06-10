export const RequiredValidator = {
    error: 'Field is required!',
    validate(value) {
        return !!value && value.length > 0;
    }
}

export const RegexValidator = (regex, error = 'Must match ' + regex) => ({
    error,
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

    async populateForView(item, dataAccess) {
        return item;
    }
}
