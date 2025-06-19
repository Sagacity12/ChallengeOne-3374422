class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.products = [];
  }
}

class SearchSuggestionSystem {
  constructor(products) {
    this.root = new TrieNode();

    // Sort products lexicographically first
    products.sort();

    // Build the trie
    for (const product of products) {
      this.insert(product);
    }
  }

  insert(product) {
    let node = this.root;

    for (const char of product) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];

      // Store up to 3 products at each node for quick retrieval
      if (node.products.length < 3) {
        node.products.push(product);
      }
    }
    node.isEndOfWord = true;
  }

  getSuggestions(searchWord) {
    const result = [];
    let node = this.root;
    let prefixFound = true;

    // Process each character in the searchWord
    for (let i = 0; i < searchWord.length; i++) {
      const char = searchWord[i];

      // If the prefix exists in the trie so far
      if (prefixFound && node.children[char]) {
        node = node.children[char];
        result.push([...node.products]); // Add its products to result
      } else {
        // If prefix doesn't exist, add empty list and mark prefix as not found
        prefixFound = false;
        result.push([]);
      }
    }

    return result;
  }
}

// Test with the example in the problem
const products = ["iphone", "samsung25", "system chipset", "Dell monitor 24", "samsung", "samsung galaxy", "samsung s21", "samsung s22 ultra", "Dell Laptop"];
const system = new SearchSuggestionSystem(products);
const result = system.getSuggestions("samsung");
console.log(JSON.stringify(result, null, 2));
