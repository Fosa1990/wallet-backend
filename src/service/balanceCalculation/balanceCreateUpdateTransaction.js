const balanceCreateUpdateTransaction = (transactionType, sum) => {
  let newBalance = null;

  if (transactionType === 'income') {
    newBalance = sum;
  } else if (transactionType === 'spend') {
    newBalance = -sum;
  }

  return newBalance;
};

module.exports = balanceCreateUpdateTransaction;
