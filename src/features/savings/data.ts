
export type SavingsGoal = {
  id: string;
  name: string;
  savedAmount: number;
  targetAmount: number;
};

export const sampleSavingsGoals: SavingsGoal[] = [
  {
    id: 'laptop',
    name: 'Laptop Fund',
    savedAmount: 1860,
    targetAmount: 3000,
  },
  {
    id: 'emergency',
    name: 'Emergency Fund',
    savedAmount: 3000,
    targetAmount: 7500,
  },
];


export const sampleTotalSavings = sampleSavingsGoals.reduce(
  (total, goal) => total + goal.savedAmount,
  0,
);
