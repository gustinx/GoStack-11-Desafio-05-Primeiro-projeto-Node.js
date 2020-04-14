import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TotalBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TotalBalance {
    return { transactions: this.transactions, balance: this.getBalance() };
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (prevIncome, currentTransaction) =>
        currentTransaction.type === 'income'
          ? prevIncome + currentTransaction.value
          : prevIncome,
      0,
    );

    const outcome = this.transactions.reduce(
      (prevOutcome, currentTransaction) =>
        currentTransaction.type === 'outcome'
          ? prevOutcome + currentTransaction.value
          : prevOutcome,
      0,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
