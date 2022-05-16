const balanceCreateTransaction = (transactionType, balance, sum) => {
  let newBalance = balance;

  if (transactionType === 'income') {
    newBalance = newBalance + Number(sum);
  } else if (transactionType === 'spend') {
    newBalance = newBalance - Number(sum);
  }

  return newBalance;
};

module.exports = balanceCreateTransaction;
