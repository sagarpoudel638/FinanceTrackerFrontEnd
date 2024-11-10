import { getTransactions } from "./axiosHelper";
export const getIncomeExpenses = async () => {
  try {
    const response = await getTransactions();
    const transactions = response.data;
    return transactions;
  } catch (error) {
    throw new Error(response.message);
  }
};

const transactions = await getIncomeExpenses();
export const calculateTotals = () => {
    const totalIncome = transactions.reduce(
      (sum, transaction) => sum + (parseFloat(transaction.income) || 0),
      0
    );
    const totalExpenses = transactions.reduce(
      (sum, transaction) => sum + (parseFloat(transaction.expenses) || 0),
      0
    );
    const netStatus = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, netStatus };
  };
