import React from 'react';
import Button from '../ui/Button';
import classes from './Header.module.css';

const Header: React.FC<{
    handleShowAddBudgetModal: () => void;
    handleShowExpenseModal: () => void;
}> = ({ handleShowAddBudgetModal, handleShowExpenseModal }) => {
    return (
        <header className={classes.header}>
            <h2 className={classes.logo}>Budgets</h2>
            <div className={classes['alt-btn']}>
                <Button onClick={handleShowAddBudgetModal}>Add Budget</Button>
                <Button onClick={handleShowExpenseModal}>Add Expense</Button>
            </div>
        </header>
    );
};

export default Header;
