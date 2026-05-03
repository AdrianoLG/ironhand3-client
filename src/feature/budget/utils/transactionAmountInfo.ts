import arrowDownIcon from '../assets/arrowdown.svg';
import arrowUpIcon from '../assets/arrowup.svg';
import equalIcon from '../assets/equal.svg';
import { iTransactions } from '../types/types';

export const getTransactionAmountInfo = (transaction: iTransactions) => {
  const hasRealAmount = typeof transaction.realAmount === 'number'
  const realAmount = transaction.realAmount ?? 0
  const hasBothAmounts =
    typeof transaction.expectedAmount === 'number' && hasRealAmount

  const differenceIcon = hasBothAmounts
    ? realAmount < transaction.expectedAmount
      ? arrowDownIcon
      : realAmount > transaction.expectedAmount
        ? arrowUpIcon
        : equalIcon
    : null

  return {
    hasRealAmount,
    differenceIcon
  }
}
