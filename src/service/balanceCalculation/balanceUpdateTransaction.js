const balanceUpdateTransaction = (
  transactionType,
  sum,
  prevSum,
  prevTransactionType,
) => {
  let newBalance = null;

  if (prevTransactionType !== transactionType) {
    if (prevTransactionType === 'spend') {
      newBalance = Number(sum) + Number(prevSum);
    } else if (prevTransactionType === 'income') {
      newBalance = -(Number(sum) + Number(prevSum));
    }
  } else {
    if (transactionType === 'income' && sum > prevSum) {
      newBalance = Number(sum) - Number(prevSum);
    } else if (transactionType === 'income' && sum < prevSum) {
      newBalance = Number(sum) - Number(prevSum);
    } else if (transactionType === 'spend' && sum > prevSum) {
      newBalance = Number(prevSum) - Number(sum);
    } else if (transactionType === 'spend' && sum < prevSum) {
      newBalance = Number(prevSum) - Number(sum);
    }
  }
  return newBalance;
};

module.exports = balanceUpdateTransaction;
