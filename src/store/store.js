import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../slices/taskSlice';
import calendarReducer from '../slices/calendarSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        calendar: calendarReducer,
    },
});

export default store;