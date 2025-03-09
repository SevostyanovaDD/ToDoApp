import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        currentDate: new Date().toISOString().split('T')[0],
        selectedDate: new Date().toISOString().split('T')[0],
    },
    reducers: {
        setCurrentDate: (state, action) => {
            state.currentDate = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
    },
});

export const { setCurrentDate, setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;