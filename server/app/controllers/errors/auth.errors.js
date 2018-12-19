import { createError } from 'apollo-errors';

const NoUserError = createError('NoUserError', {
  message: 'That email is not registered.'
});

const MissingRequiredFieldsError = createError('MissingRequiredFieldsError', {
  message: 'Missing required fields.'
});

const InvalidEmailPasswordError = createError('InvalidEmailPasswordError', {
  message: 'That username or password is invalid.'
});

export { NoUserError, InvalidEmailPasswordError, MissingRequiredFieldsError };
