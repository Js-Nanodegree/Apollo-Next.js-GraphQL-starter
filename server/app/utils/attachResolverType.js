export default ({ array, type }) => {
  return array.map(item => {
    return {
      ...item,
      resolveType: type
    };
  });
};
