import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, toggleCompleted, updateTasks } from '../../slices/taskSlice';
import { setSelectedDate, setCurrentDate } from '../../slices/calendarSlice';
import './TodoWrapper.css';
import Task from '../Task/Task';
import Calendar from "../Calendar/Calendar";

function Wrapper() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const { selectedDate, currentDate } = useSelector((state) => state.calendar);
    const [showForm, setShowForm] = React.useState(false);
    const [showCalendar, setShowCalendar] = React.useState(false);
    const [newTask, setNewTask] = React.useState({ title: '', subtitle: '', completed: false });

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        dispatch(updateTasks(savedTasks));
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const hasUncompletedTasks = tasks.some((task) => !task.completed && task.date < today);

        if (hasUncompletedTasks) {
            const updatedTasks = tasks.map((task) => {
                if (!task.completed && task.date < today) {
                    return { ...task, date: today };
                }
                return task;
            });
            dispatch(updateTasks(updatedTasks));
        }
    }, [tasks, dispatch]);

    function getDate() {
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function handleAddTask() {
        if (!newTask.title.trim()) return;
        const taskWithDate = { ...newTask, date: selectedDate };
        dispatch(addTask(taskWithDate));
        setNewTask({ title: '', subtitle: '', completed: false });
        setShowForm(false);
    }

    function handleDeleteTask(index) {
        dispatch(deleteTask(index));
    }

    function handleToggleCompleted(index) {
        dispatch(toggleCompleted(index));
    }

    function handleDayClick(day) {
        const selected = new Date(currentDate);
        selected.setDate(day);
        dispatch(setSelectedDate(selected.toISOString().split('T')[0]));
    }

    function handlePrevMonth() {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        dispatch(setCurrentDate(newDate.toISOString().split('T')[0]));
    }

    function handleNextMonth() {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        dispatch(setCurrentDate(newDate.toISOString().split('T')[0]));
    }

    const filteredTasks = tasks.filter((task) => task.date === selectedDate);

    return (
        <div className='wrapper'>
            <div className='wrapper-up'>
                <div className='wrapper-up-date'>{getDate()}</div>
                <div className='wrapper-up-container'>
                    <div className='wrapper-up-calendar' onClick={() => setShowCalendar(!showCalendar)}>Calendar</div>
                    <div className='wrapper-up-add' onClick={() => setShowForm(!showForm)}>+</div>
                </div>
            </div>
            {showCalendar && (
                <Calendar
                    onDayClick={handleDayClick}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                />
            )}
            <div className='wrapper-main'>
                <div className='wrapper-main-title'>My tasks</div>
                {showForm && (
                    <div className='task-form'>
                        <input
                            type='text'
                            name='title'
                            placeholder='Task'
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <input
                            type='text'
                            name='subtitle'
                            placeholder='Description'
                            value={newTask.subtitle}
                            onChange={(e) => setNewTask({ ...newTask, subtitle: e.target.value })}
                        />
                        <button onClick={handleAddTask}>Add</button>
                    </div>
                )}
                <div className='task-list'>
                    {filteredTasks.map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            onDelete={() => handleDeleteTask(index)}
                            onToggleCompleted={() => handleToggleCompleted(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Wrapper;