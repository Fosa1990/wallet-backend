const balanceCreateTransaction = (transactionType, balanceTransaction, sum) => {
  let newBalance = balanceTransaction;
  const numberSum = Number(sum);

  if (transactionType === 'income') {
    newBalance += numberSum;
  } else if (transactionType === 'spend') {
    newBalance -= numberSum;
  }

  return newBalance;
};

module.exports = balanceCreateTransaction;
