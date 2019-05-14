const Error = ({ error }) => (
  <pre>
    {error.graphQLErrors.map(({ message }, i) => (
      <span key={i}>{message}</span>
    ))}
  </pre>
);
export default Error;
