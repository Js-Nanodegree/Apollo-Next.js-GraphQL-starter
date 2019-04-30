import fs, { readFileSync } from 'fs';
import path from 'path';
import { gql } from 'apollo-server-express';

const types = gql(readFileSync(path.join(__dirname, 'types.graphql'), 'utf8'));
const schema = gql(
  readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
);
const input = gql(readFileSync(path.join(__dirname, 'input.graphql'), 'utf8'));
const response = gql(
  readFileSync(path.join(__dirname, 'response.graphql'), 'utf8')
);

export default [types, schema, input, response];
