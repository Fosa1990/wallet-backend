const balanceUpdateTransaction = (
  transactionType,
  sum,
  prevSum,
  prevTransactionType,
) => {
  let newBalance = null;

  if (prevTransactionType !== transactionType) {
    if (prevTransactionType === 'spend') {
      newBalance = sum + prevSum;
    } else if (prevTransactionType === 'income') {
      newBalance = -(sum + prevSum);
    }
  } else {
    if (transactionType === 'income') {
      if (sum > prevSum) {
        newBalance = sum - prevSum;
      } else if (sum < prevSum) {
        newBalance = sum - prevSum;
      }
    } else if (transactionType === 'spend') {
      if (sum > prevSum) {
        newBalance = prevSum - sum;
      } else if (sum < prevSum) {
        newBalance = prevSum - sum;
      }
    }
  }

  return newBalance;
};

module.exports = balanceUpdateTransaction;
