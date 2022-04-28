export interface IBudget {
    id: string;
    name: string;
    amount: number;
}

export interface IExpense {
    id: string;
    description: string;
    budgetId: IBudget['id'];
    amount: number;
}
