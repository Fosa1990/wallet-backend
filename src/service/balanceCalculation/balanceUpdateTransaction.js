const balanceUpdateTransaction = (
  transactionType,
  sum,
  prevSum,
  prevTransactionType,
) => {
  let newBalance = null;
  const numberSum = Number(sum);
  const numberPrevSum = Number(prevSum);

  if (prevTransactionType !== transactionType) {
    if (prevTransactionType === 'spend') {
      newBalance = numberSum + numberPrevSum;
    } else if (prevTransactionType === 'income') {
      newBalance = -(numberSum + numberPrevSum);
    }
  } else {
    if (transactionType === 'income') {
      if (numberSum > numberPrevSum) {
        newBalance = numberSum - numberPrevSum;
      } else if (numberSum < numberPrevSum) {
        newBalance = numberSum - numberPrevSum;
      }
    } else if (transactionType === 'spend') {
      if (numberSum > numberPrevSum) {
        newBalance = numberPrevSum - numberSum;
      } else if (numberSum < numberPrevSum) {
        newBalance = numberPrevSum - numberSum;
      }
    }
  }
  return newBalance;
};

module.exports = balanceUpdateTransaction;
