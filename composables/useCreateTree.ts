export default (dataset) => {
    const hashTable = Object.create(null);
    dataset.forEach(aData => hashTable[aData.id] = {...aData, children: []});
    const dataTree = [];
    dataset.forEach(aData => {
      if(aData.parent_id) hashTable[aData.parent_id].children.push(hashTable[aData.id])
      else dataTree.push(hashTable[aData.id])
    });
    return dataTree;
  };
