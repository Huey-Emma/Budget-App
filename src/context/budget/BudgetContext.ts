import { createContext } from 'react';
import { IBudget, IExpense } from '../../types';

const budgetContext = {
    budgets: [] as IBudget[],
    expenses: [] as IExpense[],
    addBudget: (name: IBudget['name'], amount: IBudget['amount']) => {},
    addExpense: (
        description: IExpense['description'],
        amount: IExpense['amount'],
        budgetId: IExpense['budgetId']
    ) => {},
    removeBudget: (budgetId: string) => {},
    removeExpense: (expenseId: string) => {},
};

export type BudgetContextType = typeof budgetContext;

export default createContext(budgetContext);
