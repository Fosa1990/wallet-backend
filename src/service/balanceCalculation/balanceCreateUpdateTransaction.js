const balanceCreateUpdateTransaction = (transactionType, sum) => {
  let newBalance = null;
  const numberSum = Number(sum);

  if (transactionType === 'income') {
    newBalance = numberSum;
  } else if (transactionType === 'spend') {
    newBalance = -numberSum;
  }

  return newBalance;
};

module.exports = balanceCreateUpdateTransaction;
