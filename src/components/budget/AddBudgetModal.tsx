import React, { useEffect, useRef, useContext, useState } from 'react';
import BudgetContext from '../../context/budget/BudgetContext';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import classes from './AddBudgetExpenseModal.module.css';

const AddBudgetModal: React.FC<{ handleHideModal: () => void }> = ({
    handleHideModal,
}) => {
    const { addBudget } = useContext(BudgetContext);
    const budgetNameRef = useRef<HTMLInputElement>(null);

    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');

    useEffect(() => {
        budgetNameRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!budgetName) return;
        if (!budgetAmount) return;
        addBudget(budgetName, +budgetAmount);
        handleHideModal();
    };

    return (
        <Modal handleHideModal={handleHideModal}>
            <section className={classes['form-wrapper']}>
                <h2>Add Budget</h2>
                <hr />
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes['form-group']}>
                        <label htmlFor="id_name">Budget Name:</label>
                        <input
                            type="text"
                            id="id_name"
                            ref={budgetNameRef}
                            required
                            onChange={(e) => setBudgetName(e.target.value)}
                            value={budgetName}
                        />
                    </div>
                    <div className={classes['form-group']}>
                        <label htmlFor="id_amount">Budget Amount:</label>
                        <input
                            type="number"
                            id="id_amount"
                            min={0}
                            step="0.01"
                            required
                            onChange={(e) => setBudgetAmount(e.target.value)}
                            value={budgetAmount}
                        />
                    </div>
                    <div className={classes['form-group']}>
                        <Button type="submit">Add Budget</Button>
                    </div>
                </form>
            </section>
        </Modal>
    );
};

export default AddBudgetModal;
