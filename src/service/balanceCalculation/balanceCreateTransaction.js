const balanceCreateTransaction = (transactionType, balance, sum) => {
  let newBalance = balance;
  const numberSum = Number(sum);

  if (transactionType === 'income') {
    newBalance += numberSum;
  } else if (transactionType === 'spend') {
    newBalance -= numberSum;
  }

  return newBalance;
};

module.exports = balanceCreateTransaction;
