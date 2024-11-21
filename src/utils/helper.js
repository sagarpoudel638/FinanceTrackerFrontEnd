
//const transactions = await getIncomeExpenses();
export const calculateTotals = (transactions) => {
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
