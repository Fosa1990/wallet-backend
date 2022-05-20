const balanceCreateTransaction = (transactionType, balanceTransaction, sum) => {
  let newBalance = balanceTransaction;

  if (transactionType === 'income') {
    newBalance += sum;
  } else if (transactionType === 'spend') {
    newBalance -= sum;
  }

  return newBalance;
};

module.exports = balanceCreateTransaction;
