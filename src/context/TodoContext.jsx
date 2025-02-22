import { createContext, useContext, useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../api/index.js";
import axios from "axios";

const TodoContext = createContext(undefined);

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
            // خطا در دریافت تسک‌ها
        }
    };

    const handleAddTodo = async (task) => {
        try {
            const response = await axios.post("https://todo-api-livid.vercel.app/api/todos", {
                title: task.title,
            });
            const newTodoFromAPI = response.data;

            const newTodo = {
                ...newTodoFromAPI,
                description: task.description,
                status: task.status,
            };

            setTodos((prevTodos) => [...prevTodos, newTodo]);
            return newTodo;
        } catch (error) {
            throw error;
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } catch (error) {
            // خطا در حذف تسک
        }
    };

    const handleUpdateTodo = async (id, updatedData) => {
        try {
            const response = await axios.put(`https://todo-api-livid.vercel.app/api/todos/${id}`, updatedData);
            const updatedTodo = response.data;

            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo._id === id ? { ...todo, ...updatedTodo } : todo))
            );

            return updatedTodo;
        } catch (error) {
            throw error;
        }
    };

    return (
        <TodoContext.Provider value={{ todos, handleAddTodo, handleDeleteTodo, handleUpdateTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => useContext(TodoContext);
