import { createContext, useContext, useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../api/index.js";

const TodoContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const handleAddTodo = async (task) => {
        try {
            const newTodo = await addTodo(task);
            setTodos((prevTodos) => [...prevTodos, newTodo]);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleUpdateTodo = async (id, updatedTask) => {
        try {
            const updatedTodo = await updateTodo(id, updatedTask);
            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
            );
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <TodoContext.Provider value={{ todos, handleAddTodo, handleDeleteTodo, handleUpdateTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodo = () => useContext(TodoContext);
