import React, { useContext } from 'react';
import BudgetContext from '../../context/budget/BudgetContext';
import Button from '../ui/Button';
import { currencyFormatter, calculatePercentage } from '../../misc/funcs';
import Card from '../ui/Card';
import Progress from '../ui/Progress';
import classes from './BudgetItem.module.css';
import { IBudget } from '../../types';

const BudgetItem: React.FC<
    IBudget & { handleAddExpense: () => void; handleViewExpenses: () => void }
> = ({
    id,
    name,
    amount: budgetAmount,
    handleAddExpense,
    handleViewExpenses,
}) => {
    const { expenses } = useContext(BudgetContext);

    const expensesAmount = expenses
        .filter((expense) => expense.budgetId === id)
        .reduce((acc, val) => acc + val.amount, 0);

    return (
        <Card>
            {expensesAmount > budgetAmount && (
                <div className={classes['budget-overlay__indicator']}></div>
            )}
            <section className={classes['budget-card']}>
                <div className={classes['budget-summary']}>
                    <h3 className={classes['budget-title']}>{name}</h3>
                    <div className={classes['budget-price']}>
                        <span>{currencyFormatter.format(expensesAmount)}</span>{' '}
                        /<span>{currencyFormatter.format(budgetAmount)}</span>
                    </div>
                </div>
                <div className={classes['progress-bar__container']}>
                    <Progress
                        value={calculatePercentage(
                            expensesAmount,
                            budgetAmount
                        )}
                    />
                </div>
                <div className={classes['budget-alt__btn']}>
                    <Button onClick={handleAddExpense}>Add Expense</Button>
                    <Button onClick={handleViewExpenses}>View Expenses</Button>
                </div>
            </section>
        </Card>
    );
};

export default BudgetItem;
