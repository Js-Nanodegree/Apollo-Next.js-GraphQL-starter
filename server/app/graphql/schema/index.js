import fs from 'fs';
import path from 'path';

const types = fs.readFileSync(path.join(__dirname, 'types.graphql'), 'utf8');
const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, 'input.graphql'), 'utf8');
const response = fs.readFileSync(
  path.join(__dirname, 'response.graphql'),
  'utf8'
);

export default [types, schema, input, response];
