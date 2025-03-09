import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        deleteTask: (state, action) => {
            return state.filter((task, index) => index !== action.payload);
        },
        toggleCompleted: (state, action) => {
            const index = action.payload;
            const task = state[index];
            if (task.completed) {
                task.completed = false;
            } else {
                task.completed = true;
                const completedDate = new Date().toISOString().split('T')[0];
                const startDate = task.date;
                task.daysSpent = Math.floor(
                    (new Date(completedDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
                );
            }
        },
        updateTasks: (state, action) => {
            return action.payload;
        },
    },
});

export const { addTask, deleteTask, toggleCompleted, updateTasks } = tasksSlice.actions;
export default tasksSlice.reducer;