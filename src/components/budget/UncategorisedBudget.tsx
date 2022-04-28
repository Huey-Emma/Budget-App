import React, { useContext } from 'react';
import BudgetContext from '../../context/budget/BudgetContext';
import { UNCATEGORISED } from '../../context/budget/BudgetProvider';
import { currencyFormatter } from '../../misc/funcs';
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from './BudgetItem.module.css';

const UncategorisedBudget: React.FC<{
    handleAddExpense: () => void;
    handleViewExpenses: () => void;
}> = ({ handleAddExpense, handleViewExpenses }) => {
    const { expenses } = useContext(BudgetContext);

    const expensesAmount = expenses
        .filter((expense) => expense.budgetId === UNCATEGORISED)
        .reduce((acc, val) => acc + val.amount, 0);

    return (
        <Card>
            <div className={classes['budget-overlay__gray']}></div>
            <section className={classes['budget-card']}>
                <div className={classes['budget-summary']}>
                    <h3 className={classes['budget-title']}>Uncategorised</h3>
                    <div className={classes['budget-price']}>
                        <span>{currencyFormatter.format(expensesAmount)}</span>
                    </div>
                </div>
                <div className={classes['budget-alt__btn']}>
                    <Button onClick={handleAddExpense}>Add Expense</Button>
                    <Button onClick={handleViewExpenses}>View Expenses</Button>
                </div>
            </section>
        </Card>
    );
};

export default UncategorisedBudget;
