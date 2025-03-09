import React from 'react';
import './Task.css'
import PropTypes from 'prop-types';

function Task({ task, onDelete, onToggleCompleted }) {
    return ( <>
        <div className={`taskWrapper ${task.completed ? 'completedBackground' : ''}`}>
            <div className="task-date"> {task.completed ? `Days spent: ${task.daysSpent}` : `Created: ${task.date}`}</div>
            <div className={`task-text`}>
                <div className="task-title">{task.title}</div>
                <div className="task-subtitle">{task.subtitle}</div>
            </div>
            <div className="task-checked"><input type='checkbox' checked={task.completed} onChange={onToggleCompleted}/></div>
            <div className="task-delete" onClick={onDelete}>❌</div>
        </div>
    </> );
}
Task.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        completed: PropTypes.bool.isRequired,
        date: PropTypes.string.isRequired,
        daysSpent: PropTypes.number, 
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
};
export default Task;