import React, { useContext, useRef, useState, useEffect } from 'react';
import BudgetContext from '../../context/budget/BudgetContext';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import classes from './AddBudgetExpenseModal.module.css';
import { UNCATEGORISED } from '../../context/budget/BudgetProvider';

const AddExpenseModal: React.FC<{
    handleHideModal: () => void;
    selectedBudgetId?: string;
}> = ({ handleHideModal, selectedBudgetId }) => {
    const { budgets, addExpense } = useContext(BudgetContext);

    const descriptionRef = useRef<HTMLInputElement>(null);

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [budgetId, setBudgetId] = useState(selectedBudgetId || UNCATEGORISED);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!description) return;
        if (!amount) return;
        if (!budgetId) return;
        addExpense(description, +amount, budgetId);
        handleHideModal();
    };

    useEffect(() => {
        descriptionRef.current?.focus();
    }, []);

    return (
        <Modal handleHideModal={handleHideModal}>
            <section className={classes['form-wrapper']}>
                <h2>Add Expense</h2>
                <hr />
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes['form-group']}>
                        <label htmlFor="id_description">
                            Expense Description:
                        </label>
                        <input
                            type="text"
                            id="id_description"
                            required
                            ref={descriptionRef}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <div className={classes['form-group']}>
                        <label htmlFor="id_amount">Expense Amount:</label>
                        <input
                            type="number"
                            id="id_amount"
                            min={0}
                            step="0.01"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                        />
                    </div>
                    <div className={classes['form-group']}>
                        <select
                            id="id_budget"
                            onChange={(e) => setBudgetId(e.target.value)}
                            value={budgetId}
                        >
                            <option value={UNCATEGORISED}>Uncategorised</option>
                            {budgets.map((budget) => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={classes['form-group']}>
                        <Button type="submit">Add Expense</Button>
                    </div>
                </form>
            </section>
        </Modal>
    );
};

export default AddExpenseModal;
