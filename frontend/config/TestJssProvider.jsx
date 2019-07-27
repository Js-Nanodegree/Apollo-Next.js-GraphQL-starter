import JssProvider from 'react-jss/lib/JssProvider';
import { node, arrayOf, oneOfType } from 'prop-types';

const generateClassName = (rule, styleSheet) => `${styleSheet.options.classNamePrefix}-${rule.key}`;

const TestJssProvider = ({ children }) => (
  <JssProvider generateClassName={generateClassName}>{children}</JssProvider>
);
TestJssProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};
export default TestJssProvider;
