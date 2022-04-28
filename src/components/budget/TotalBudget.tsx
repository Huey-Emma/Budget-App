import React, { useContext } from 'react';
import BudgetContext from '../../context/budget/BudgetContext';
import Card from '../ui/Card';
import { currencyFormatter, calculatePercentage } from '../../misc/funcs';
import Progress from '../ui/Progress';
import classes from './BudgetItem.module.css';

const TotalBudget = () => {
    const { expenses, budgets } = useContext(BudgetContext);

    const totalBudgetsAmount = budgets.reduce(
        (acc, val) => acc + val.amount,
        0
    );

    const totalExpensesAmout = expenses.reduce(
        (acc, val) => acc + val.amount,
        0
    );

    return (
        <Card>
            <div className={classes['budget-overlay__gray']}></div>
            <section className={classes['budget-card']}>
                <div className={classes['budget-summary']}>
                    <h3 className={classes['budget-title']}>Total</h3>
                    <div className={classes['budget-price']}>
                        <span>
                            {currencyFormatter.format(totalExpensesAmout)}
                        </span>{' '}
                        /
                        <span>
                            {currencyFormatter.format(totalBudgetsAmount)}
                        </span>
                    </div>
                </div>
                <div className={classes['progress-bar__container']}>
                    <Progress
                        value={calculatePercentage(
                            totalExpensesAmout,
                            totalBudgetsAmount
                        )}
                    />
                </div>
            </section>
        </Card>
    );
};

export default TotalBudget;
