import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import BudgetContext from '../../context/budget/BudgetContext';
import { UNCATEGORISED } from '../../context/budget/BudgetProvider';
import { currencyFormatter } from '../../misc/funcs';
import { IBudget, IExpense } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import classes from './ViewExpenseModal.module.css';

const ExpenseItem: React.FC<{
    expenseId: IExpense['id'];
    description: IExpense['description'];
    amount: IExpense['amount'];
    handleHideModal: () => void;
}> = ({ description, amount, expenseId, handleHideModal }) => {
    const { removeExpense } = useContext(BudgetContext);

    return (
        <div className={classes['expense-item']}>
            <h4>{description}</h4>
            <section>
                <p className={classes['expense-amount']}>
                    {currencyFormatter.format(amount)}
                </p>
                <FaTimes
                    className={classes['delete-expense__icon']}
                    onClick={() => {
                        removeExpense(expenseId);
                        handleHideModal();
                    }}
                />
            </section>
        </div>
    );
};

const ViewExpenseModal: React.FC<{
    handleHideModal: () => void;
    selectedBudgetId: IBudget['id'];
    selectedBudgetName: IBudget['name'];
}> = ({ handleHideModal, selectedBudgetId, selectedBudgetName }) => {
    const { removeBudget, expenses } = useContext(BudgetContext);

    let budgetSpecificExpenses = expenses.filter(
        (expense) => expense.budgetId === selectedBudgetId
    );

    return (
        <Modal handleHideModal={handleHideModal}>
            <div className={classes['expense-heading']}>
                <h3>
                    Expenses - <span>{selectedBudgetName}</span>
                </h3>
                {selectedBudgetName !== UNCATEGORISED && (
                    <Button
                        onClick={() => {
                            removeBudget(selectedBudgetId);
                            handleHideModal();
                        }}
                    >
                        Delete
                    </Button>
                )}
            </div>
            <section className={classes['expense-items']}>
                {budgetSpecificExpenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        expenseId={expense.id}
                        description={expense.description}
                        amount={expense.amount}
                        handleHideModal={handleHideModal}
                    />
                ))}
            </section>
        </Modal>
    );
};

export default ViewExpenseModal;
