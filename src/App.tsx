import React, { useState } from 'react';
import BudgetList from './components/budget/BudgetList';
import Header from './components/layouts/Header';
import Container from './components/ui/Container';
import AddBudgetModal from './components/budget/AddBudgetModal';
import BudgetProvider from './context/budget/BudgetProvider';
import AddExpenseModal from './components/budget/AddExpenseModal';

const App = () => {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

    return (
        <BudgetProvider>
            {showAddExpenseModal && (
                <AddExpenseModal
                    handleHideModal={() => setShowAddExpenseModal(false)}
                />
            )}
            {showAddBudgetModal && (
                <AddBudgetModal
                    handleHideModal={() => setShowAddBudgetModal(false)}
                />
            )}
            <Container>
                <Header
                    handleShowAddBudgetModal={() => setShowAddBudgetModal(true)}
                    handleShowExpenseModal={() => setShowAddExpenseModal(true)}
                />
                <BudgetList />
            </Container>
        </BudgetProvider>
    );
};

export default App;
