import React, {createContext, useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
export const TaskListContext = createContext()

const TaskListContextProvider = ({children}) => {
    const initialState = JSON.parse(localStorage.getItem('tasks')) || []

    const [tasks, setTasks ] = useState(initialState)

    const [editItem, setEditItem] = useState(null)

    const editTask = (title, id) => {
        const newTasks = tasks.map(task => task.id === id ? {title, id} : task)
        setTasks(newTasks)
        setEditItem(null)
    }
    
    const findItem = (id) => {
        const item = tasks.find(task => task.id === id )
        setEditItem(item)
    }

    const addTask =(title)=>{
        setTasks([
            ...tasks,
            {title, id: uuidv4()}
        ])
    }

    const removeTask = id => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const clearList =()=>{
        setTasks([])
    }

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(tasks))
    },[tasks])

    return (
        <TaskListContext.Provider value={{tasks, addTask, removeTask, clearList, findItem, editItem, editTask}}>
            {children}
        </TaskListContext.Provider>
    )
}


export default TaskListContextProvider