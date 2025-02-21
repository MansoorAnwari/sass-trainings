import  { useState, useEffect } from "react";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../api";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const data = await getTodos();
        setTodos(data);
    };

    const handleAdd = async () => {
        if (newTodo.trim() === "") return;
        const todo = await addTodo(newTodo);
        setTodos([...todos, todo]);
        setNewTodo("");
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter((todo) => todo._id !== id));
    };

    const handleEdit = async (id) => {
        const updatedTitle = prompt("ویرایش کار:", todos.find(todo => todo._id === id).title);
        if (updatedTitle) {
            const updatedTodo = await updateTodo(id, updatedTitle);
            setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
        }
    };

    return (
        <div className="todo-container">
            <h2 className="todo-title">لیست کارها</h2>
            <div>
                <input
                    type="text"
                    className="todo-input"
                    placeholder="تسک جدید..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button className="todo-button" onClick={handleAdd}>
                    افزودن
                </button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo._id} className="todo-item">
                        <span className="todo-text">{todo.title}</span>
                        <div className="todo-actions">
                            <button className="todo-edit" onClick={() => handleEdit(todo._id)}>
                                ویرایش
                            </button>
                            <button className="todo-delete" onClick={() => handleDelete(todo._id)}>
                                حذف
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
