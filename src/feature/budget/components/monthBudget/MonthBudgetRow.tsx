import IconButton from '../../../../components/atoms/IconButton';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import paymentIcon from '../../assets/payment.svg';
import { iTransactions } from '../../types/types';
import { formatBudgetAmount } from '../../utils/amountFormat';
import { getTransactionAmountInfo } from '../../utils/transactionAmountInfo';
import { getTransactionCategoryInfo } from '../../utils/transactionCategoryInfo';

type MonthBudgetRowProps = {
  transaction: iTransactions
  onEdit: (transaction: iTransactions) => void
  onDelete: (transaction: iTransactions) => void
}

const MonthBudgetRow = ({
  transaction,
  onEdit,
  onDelete
}: MonthBudgetRowProps) => {
  const categoryInfo = getTransactionCategoryInfo(transaction.category)
  const { hasRealAmount, differenceIcon } =
    getTransactionAmountInfo(transaction)

  return (
    <div
      key={transaction._id}
      className='odd:bg-secondaryLightest grid grid-cols-6 px-4 py-2'
    >
      <div className='flex items-center self-center'>
        <img
          src={categoryInfo.icon}
          alt={categoryInfo.labelEs}
          className='mr-2 h-3 w-3'
        />
        <p className='text-sm'>{categoryInfo.labelEs}</p>
      </div>
      <p className='col-span-2'>{transaction.title}</p>
      <p>{formatBudgetAmount(transaction.expectedAmount)} €</p>
      <p>
        {hasRealAmount
          ? `${formatBudgetAmount(transaction.realAmount)} €`
          : '-'}
      </p>
      <div className='grid grid-cols-4 items-center justify-items-center gap-2'>
        <IconButton
          img={editIcon}
          xsmall
          outline
          onMouseClick={() => onEdit(transaction)}
        />
        <IconButton
          img={deleteIcon}
          xsmall
          outline
          onMouseClick={() => onDelete(transaction)}
        />
        <img
          src={paymentIcon}
          alt='Pago'
          className='w-full max-w-4'
          style={{ opacity: transaction.isPaid ? 1 : 0.7 }}
        />
        {(differenceIcon && (
          <img
            src={differenceIcon}
            alt='Diferencia de importe'
            className='w-full max-w-4'
          />
        )) || <p>-</p>}
      </div>
    </div>
  )
}

export default MonthBudgetRow
