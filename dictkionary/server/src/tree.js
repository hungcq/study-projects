let root;

const makeNode = (value, data) => {
  return {
    value,
    data,
    height: 1,
    left: null,
    right: null
  }
}

const insertValue = (value, data) => {
  root = insert(root, value, data);
}

const deleteValue = (value) => {
  root = del(root, value);
}

const findData = (value) => {
  const result = find(root, value);
  if (result) {
    return result.data;
  }
  return null;
}

const getSuggestion = (value) => {
  const list = [];
  if (value === '') {
    return [];
  }
  let value2 = value;
  // let lastChar = value2.charCodeAt(value2.length - 1);
  // value2 = value2.substring(0, value2.length - 1) + String.fromCharCode(lastChar + 1);
  value2 += 'zzzzzzzzzzz';
  findSuggestion(root, value, value2, list);
  return list;
}

const find = (root, value) => {
  if (root == null) {
    return null;
  }
  if (value === root.value) {
    return root;
  }
  if (value > root.value) {
    return find(root.right, value);
  }
  return find(root.left, value);
}

const findSuggestion = (root, value, value2, list) => {
  if (root == null) {
    return;
  }
  if (list.length > 10) {
    return;
  }
  if (root.value >= value && root.value <= value2) {
    findSuggestion(root.left, value, value2, list);
    list.push(root.value);
    findSuggestion(root.right, value, value2, list);
    return;
  }
  if (root.value < value) {
    findSuggestion(root.right, value, value2, list);
    return;
  }
  if (root.value > value2) {
    findSuggestion(root.left, value, value2, list);
    return;
  }
}

const insert = (root, value, data) => {
  if (!root) {
    return makeNode(value, data);
  }
  if (value < root.value) {
    root.left = insert(root.left, value, data);
  } else if (value > root.value) {
    root.right = insert(root.right, value, data);
  } else {
    return root;
  }
  return balanceNode(root);
}

const del = (root, value) => {
  if (root == null) {
    return null;
  }
  if (root.value > value) {
    root.left = del(root.left, value);
  } else if (root.value < value) {
    root.right = del(root.right, value);
  } else {
    if (root.left == null && root.right == null) {
      return null;
    }
    if (root.left != null && root.right != null) {
      let tmp = root.right;
      while (tmp.left != null) {
        tmp = tmp.left;
      }
      root.value = tmp.value;
      root.right = del(root.right, tmp.value);
    }
    if (root.left == null) {
      root = root.right;
    } else {
      root = root.left;
    }
  }
  return balanceNode(root);
}

const balanceNode = (root) => {
  root.height = getParentHeight(root);
  if (getBalanceFactor(root) > 1) {
    if (getBalanceFactor(root.left) < 0) {
      root.left = rotateLeft(root.left);
    }
    root = rotateRight(root);
  } else if (getBalanceFactor(root) < -1) {
    if (getBalanceFactor(root.right) > 0) {
      root.right = rotateRight(root.right);
    }
    root = rotateLeft(root);
  }
  return root;
}

const rotateRight = (node) => {
  let left = node.left;
  let tmp = left.right;
  left.right = node;
  node.left = tmp;
  node.height = getParentHeight(node);
  left.height = getParentHeight(left);
  return left;
}

const rotateLeft = (node) => {
  let right = node.right;
  let tmp = right.left;
  right.left = node;
  node.right = tmp;
  node.height = getParentHeight(node);
  right.height = getParentHeight(right);
  return right;
}

const getParentHeight = (parent) => {
  return Math.max(getHeight(parent.left), getHeight(parent.right)) + 1;
}

const getBalanceFactor = (node) => {
  if (node == null) {
    return 0;
  }
  return getHeight(node.left) - getHeight(node.right);
}

const getHeight = (node) => {
  if (!node) {
    return 0;
  }
  return node.height;
}

const tree = {
  root,
}

module.exports = {
  tree,
  insertValue,
  deleteValue,
  findData,
  getSuggestion,
}

