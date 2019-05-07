import { createError } from 'apollo-errors';

export const InvalidURLStatusError = createError('InvalidURLStatusError', {
  message: 'Can not create a UCID for an invalid URL.'
});

export const InvalidURLError = createError('InvalidURLError', {
  message: 'The provided URL returned an invalid status.'
});
