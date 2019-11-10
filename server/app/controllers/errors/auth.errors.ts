import { createError } from 'apollo-errors';

const UnauthorizedRequestError = createError('UnauthorizedRequestError', {
  message: 'You are not authorized to perform that action.'
});

const NoUserError = createError('NoUserError', {
  message: 'That email is not registered.'
});

const MissingRequiredFieldsError = createError('MissingRequiredFieldsError', {
  message: 'Missing required fields.'
});

const InvalidEmailPasswordError = createError('InvalidEmailPasswordError', {
  message: 'That username or password is invalid.'
});

const EmailAdlreadyRegisteredError = createError(
  'EmailAdlreadyRegisteredError',
  {
    message: 'That email is already registered.'
  }
);

export {
  UnauthorizedRequestError,
  NoUserError,
  InvalidEmailPasswordError,
  MissingRequiredFieldsError,
  EmailAdlreadyRegisteredError
};
