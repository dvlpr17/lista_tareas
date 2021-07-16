import React, {Fragment, useState, useRef} from "react";
import {v4 as uuidv4} from "uuid";
import {TodoList} from './components/TodoList';

// https://www.youtube.com/watch?v=EMk6nom1aS4

export function App(){
    const [todos, setTodos] = useState([
        { id: 1, task: "Tarea 1", completed: false }
    ]);

    const todoTaskRef = useRef();
    const toggleTodo = (id) => {
        const newTodos = [... todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    //AGREGAR TAREAS
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if(task === '') return;
        
        setTodos((prevTodos) => {
            return[... prevTodos, {id:uuidv4(), task, complete:false}]
        });
        
        todoTaskRef.current.value = null;
    }

    //ELIMINAR TAREAS
    const handleClearAll = () => {
        //console.log(todoTaskRef.current.value);
        const newTodos = todos.filter((todos) => !todos.completed);
        setTodos(newTodos);
    }
    

    return (
        <Fragment>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoTaskRef} type="text" placeholder="Nueva tarea"/>
        <button onClick={handleTodoAdd}>Agregar</button>
        <button onClick={handleClearAll}>Eliminar</button>
        <p></p>
        <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
        </Fragment>
    );
}