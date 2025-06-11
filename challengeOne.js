class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;

    for (let c of word) {
      const index = c.charCodeAt(0) - "a".charCodeAt(0);

    if (!current.children[index]) {
        current.children[index] = new TrieNode();
      }

      current = current.children[index];
    }

    
    current.isEndOfWord = true;
  }

  search(word) {
    let current = this.root;

    for (let c of word) {
      const index = c.charCodeAt(0) - "a".charCodeAt(0);

      if (!current.children[index]) {
        return false;
      }

      current = current.children[index];
    }


    return current.isEndOfWord;
  }

  startsWith(prefix) {
    let current = this.root;

    for (let c of prefix) {
      const index = c.charCodeAt(0) - "a".charCodeAt(0);

      if (!current.children[index]) {
        return false;
      }

      current = current.children[index];
    }
    return true;
  }
}

class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null); 
    this.isEndOfWord = false;
  }
}
