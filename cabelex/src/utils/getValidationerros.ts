import { ValidationError } from 'yup';

interface ErrorsInterface {
    [key: string]: string;
}

export default function GetvalidationErrors(err: ValidationError): ErrorsInterface {
    const validationerros: ErrorsInterface = {};

    err.inner.forEach(error => {
        validationerros[error.path!] = error.message;
    });

    return validationerros;
}