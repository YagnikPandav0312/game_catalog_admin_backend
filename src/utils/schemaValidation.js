exports.validate = async (body, schema) => {
    const validationSchema = schema;
    if (typeof validationSchema !== 'undefined' && validationSchema !== null) {
        const validateData = validationSchema.validate(body);
        if (validateData.error && validateData.error !== null) {
            return validateData.error.message;
        }
    }
};
