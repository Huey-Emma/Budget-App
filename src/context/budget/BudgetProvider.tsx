import React, { useReducer } from 'react';
import BudgetContext, { BudgetContextType } from './BudgetContext';
import { genRandomString } from '../../misc/funcs';
import { IBudget, IExpense } from '../../types';

export const UNCATEGORISED = 'uncategorised';

type BudgetActions =
    | {
          type: 'ADD_BUDGET';
          payload: { name: string; amount: number };
      }
    | {
          type: 'ADD_EXPENSE';
          payload: { description: string; amount: number; budgetId: string };
      }
    | {
          type: 'REMOVE_EXPENSE';
          payload: { expenseId: string };
      }
    | {
          type: 'REMOVE_BUDGET';
          payload: { budgetId: string };
      };

const getInitialBudgetState = () => {
    let storedBudgets = localStorage.getItem('budgets');
    let storedExpenses = localStorage.getItem('expenses');

    return {
        budgets: JSON.parse(
            storedBudgets || '[]'
        ) as BudgetContextType['budgets'],
        expenses: JSON.parse(
            storedExpenses || '[]'
        ) as BudgetContextType['expenses'],
    };
};

const createBudget = (name: string, amount: number): IBudget => ({
    id: genRandomString(),
    name,
    amount,
});

const createExpense = (
    description: string,
    amount: number,
    budgetId: string
): IExpense => ({
    id: genRandomString(),
    amount,
    description,
    budgetId,
});

const addBudgetAction = (
    state: ReturnType<typeof getInitialBudgetState>,
    name: string,
    amount: number
) => {
    const newState = {
        ...state,
        budgets: [...state.budgets, createBudget(name, amount)],
    };
    localStorage.setItem('budgets', JSON.stringify(newState.budgets));
    return newState;
};

const addExpenseAction = (
    state: ReturnType<typeof getInitialBudgetState>,
    description: string,
    amount: number,
    budgetId: string
) => {
    const newState = {
        ...state,
        expenses: [
            ...state.expenses,
            createExpense(description, amount, budgetId),
        ],
    };
    localStorage.setItem('expenses', JSON.stringify(newState.expenses));
    return newState;
};

const removeExpenseAction = (
    state: ReturnType<typeof getInitialBudgetState>,
    expenseId: string
) => {
    const newState = {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== expenseId),
    };

    localStorage.setItem('expenses', JSON.stringify(newState.expenses));
    return newState;
};

const removeBudgetAction = (
    state: ReturnType<typeof getInitialBudgetState>,
    budgetId: string
) => {
    const newState = {
        ...state,
        budgets: state.budgets.filter((budget) => budget.id !== budgetId),
        expenses: state.expenses.map((expense) =>
            expense.budgetId === budgetId
                ? { ...expense, budgetId: UNCATEGORISED }
                : expense
        ),
    };

    localStorage.setItem('budgets', JSON.stringify(newState.budgets));
    localStorage.setItem('expenses', JSON.stringify(newState.expenses));
    return newState;
};

const budgetReducer = (
    state: ReturnType<typeof getInitialBudgetState> = getInitialBudgetState(),
    action: BudgetActions
) => {
    switch (action.type) {
        case 'ADD_BUDGET':
            return addBudgetAction(
                state,
                action.payload.name,
                action.payload.amount
            );
        case 'ADD_EXPENSE':
            return addExpenseAction(
                state,
                action.payload.description,
                action.payload.amount,
                action.payload.budgetId
            );
        case 'REMOVE_EXPENSE':
            return removeExpenseAction(state, action.payload.expenseId);
        case 'REMOVE_BUDGET':
            return removeBudgetAction(state, action.payload.budgetId);
        default:
            return state;
    }
};

const BudgetProvider: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const [budgetState, budgetActionDispatcher] = useReducer(
        budgetReducer,
        getInitialBudgetState()
    );

    const addBudget: BudgetContextType['addBudget'] = (name, amount) => {
        budgetActionDispatcher({
            type: 'ADD_BUDGET',
            payload: { name, amount },
        });
    };

    const removeBudget: BudgetContextType['removeBudget'] = (budgetId) => {
        budgetActionDispatcher({
            type: 'REMOVE_BUDGET',
            payload: { budgetId },
        });
    };

    const addExpense: BudgetContextType['addExpense'] = (
        description,
        amount,
        budgetId
    ) => {
        budgetActionDispatcher({
            type: 'ADD_EXPENSE',
            payload: { description, amount, budgetId },
        });
    };

    const removeExpense: BudgetContextType['removeExpense'] = (expenseId) => {
        budgetActionDispatcher({
            type: 'REMOVE_EXPENSE',
            payload: { expenseId },
        });
    };

    return (
        <BudgetContext.Provider
            value={{
                budgets: budgetState.budgets,
                expenses: budgetState.expenses,
                addBudget,
                addExpense,
                removeBudget,
                removeExpense,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

export default BudgetProvider;
