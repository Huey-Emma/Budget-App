import React, { useContext, useState } from 'react';
import BudgetContext from '../../context/budget/BudgetContext';
import AddExpenseModal from './AddExpenseModal';
import ViewExpenseModal from './ViewExpenseModal';
import UncategorisedBudget from './UncategorisedBudget';
import BudgetItem from './BudgetItem';
import TotalBudget from './TotalBudget';
import classes from './BudgetList.module.css';
import { UNCATEGORISED } from '../../context/budget/BudgetProvider';

const BudgetList = () => {
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);

    const [selectedBudgetId, setSelectedBudgetId] = useState('');
    const [selectedBudgetName, setSelectedBudgetName] = useState('');

    const { budgets } = useContext(BudgetContext);

    return (
        <React.Fragment>
            {showViewExpenseModal && (
                <ViewExpenseModal
                    handleHideModal={() => setShowViewExpenseModal(false)}
                    selectedBudgetId={selectedBudgetId}
                    selectedBudgetName={selectedBudgetName}
                />
            )}
            {showAddExpenseModal && (
                <AddExpenseModal
                    handleHideModal={() => setShowAddExpenseModal(false)}
                    selectedBudgetId={selectedBudgetId}
                />
            )}
            <div className={classes['budget-grid']}>
                {budgets.map((budget) => (
                    <BudgetItem
                        handleAddExpense={() => {
                            setShowAddExpenseModal(true);
                            setSelectedBudgetId(budget.id);
                        }}
                        handleViewExpenses={() => {
                            setShowViewExpenseModal(true);
                            setSelectedBudgetId(budget.id);
                            setSelectedBudgetName(budget.name);
                        }}
                        key={budget.id}
                        name={budget.name}
                        id={budget.id}
                        amount={budget.amount}
                    />
                ))}
                <UncategorisedBudget
                    handleViewExpenses={() => {
                        setShowViewExpenseModal(true);
                        setSelectedBudgetId(UNCATEGORISED);
                        setSelectedBudgetName(UNCATEGORISED);
                    }}
                    handleAddExpense={() => {
                        setShowAddExpenseModal(true);
                        setSelectedBudgetId('');
                    }}
                />
                <TotalBudget />
            </div>
        </React.Fragment>
    );
};

export default BudgetList;
