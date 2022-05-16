const balanceDeleteTransaction = (transactionType, sum) => {
  let newBalance = null;

  if (transactionType === 'income') {
    newBalance = -Number(sum);
  } else if (transactionType === 'spend') {
    newBalance = Number(sum);
  }

  return newBalance;
};

module.exports = balanceDeleteTransaction;
