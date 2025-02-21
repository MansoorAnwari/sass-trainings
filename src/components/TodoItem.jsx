import { useTodo } from "../context/TodoContext";
import { useState } from "react";

const TodoItem = ({ todo }) => {
    const { handleDeleteTodo, handleUpdateTodo } = useTodo();
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState(todo.task);

    const handleSave = () => {
        handleUpdateTodo(todo._id, newTask);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    <button onClick={handleSave}>ذخیره</button>
                </>
            ) : (
                <>
                    <span>{todo.task}</span>
                    <button onClick={() => setIsEditing(true)}>ویرایش</button>
                    <button onClick={() => handleDeleteTodo(todo._id)}>حذف</button>
                </>
            )}
        </li>
    );
};

export default TodoItem;
