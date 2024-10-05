const unstables = [
  {
    weight: 5,
    type: 'table',
    name: 'Unstable Foods',
    item: 'food/composite/unstable'
  }
];

module.exports = {
  name: 'JS Test',
  id: 'js_test',
  pools: [
    {
      entries: unstables
    }
  ]
};
