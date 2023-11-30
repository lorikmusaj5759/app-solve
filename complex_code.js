/* filename: complex_code.js */

// This code demonstrates a complex implementation of a blockchain network
// with multiple nodes and transactions

// Node class
class Node {
  constructor(name) {
    this.name = name;
    this.pendingTransactions = [];
    this.chain = [];
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesisBlock = new Block(Date.now(), [], '0');
    this.chain.push(genesisBlock);
  }

  createTransaction(sender, recipient, amount) {
    const transaction = new Transaction(sender, recipient, amount);
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(miningRewardAddress) {
    const block = new Block(Date.now(), this.pendingTransactions);
    block.previousHash = this.chain[this.chain.length - 1].hash;
    block.mineBlock();
    console.log(`Block mined: ${block.hash}`);
    this.chain.push(block);

    const rewardTransaction = new Transaction(
      null,
      miningRewardAddress,
      miningRewardAmount
    );
    this.pendingTransactions = [rewardTransaction];
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.sender === address) {
          balance -= transaction.amount;
        }
        if (transaction.recipient === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
  }
}

// Block class
class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    // Hashing logic...
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

// Transaction class
class Transaction {
  constructor(sender, recipient, amount) {
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
  }
}

// Parameters
const difficultyLevel = 4;
const miningRewardAmount = 10;

// Create nodes
const node1 = new Node('Node 1');
const node2 = new Node('Node 2');

// Node 1 creates transactions
node1.createTransaction('address1', 'address2', 50);
node1.createTransaction('address2', 'address1', 20);

// Mine transactions
node1.minePendingTransactions('rewardAddress');

// Get balances
console.log(`Balance of address1: ${node1.getBalanceOfAddress('address1')}`);
console.log(`Balance of address2: ${node1.getBalanceOfAddress('address2')}`);

// Node 2 creates transactions
node2.createTransaction('address2', 'address1', 30);
node2.createTransaction('address1', 'address2', 10);

// Mine transactions
node2.minePendingTransactions('rewardAddress');

// Get balances
console.log(`Balance of address1: ${node2.getBalanceOfAddress('address1')}`);
console.log(`Balance of address2: ${node2.getBalanceOfAddress('address2')}`);